/**
 * Unified 3D Canvas Interaction Controller
 * Provides high-performance Pointer Events (touch + mouse), multi-touch pinch-to-zoom,
 * and standard accessible keyboard navigation for Three.js viewports.
 */

export interface CanvasControlOptions {
  onRotate: (deltaX: number, deltaY: number) => void;
  onZoom: (deltaZoom: number) => void;
  onReset?: () => void;
  onToggleAutoRotate?: () => void;
  onDragStateChange?: (isDragging: boolean) => void;
  rotateSpeed?: number;
  zoomSpeed?: number;
}

export function attachCanvasControls(
  domElement: HTMLElement,
  options: CanvasControlOptions
): () => void {
  const {
    onRotate,
    onZoom,
    onReset,
    onToggleAutoRotate,
    onDragStateChange,
    rotateSpeed = 0.008,
    zoomSpeed = 0.015,
  } = options;

  // Prevent default touch gestures (e.g. page scrolling) over the 3D viewport
  domElement.style.touchAction = 'none';

  const pointers = new Map<number, { x: number; y: number }>();
  let prevPinchDist = 0;

  const onPointerDown = (e: PointerEvent) => {
    // Only capture primary button or touch points
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    try {
      domElement.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer capture is unsupported or already set
    }

    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 1) {
      onDragStateChange?.(true);
    } else if (pointers.size === 2) {
      const [p1, p2] = Array.from(pointers.values());
      prevPinchDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!pointers.has(e.pointerId)) return;

    if (pointers.size === 1) {
      const prev = pointers.get(e.pointerId)!;
      const deltaX = e.clientX - prev.x;
      const deltaY = e.clientY - prev.y;

      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      onRotate(deltaX * rotateSpeed, deltaY * rotateSpeed);
    } else if (pointers.size === 2) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [p1, p2] = Array.from(pointers.values());
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

      if (prevPinchDist > 0) {
        const deltaDist = dist - prevPinchDist;
        // Pinch out (spread) zooms in (negative camera distance), pinch in zooms out
        onZoom(-deltaDist * zoomSpeed * 0.5);
      }
      prevPinchDist = dist;
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    pointers.delete(e.pointerId);
    try {
      domElement.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }

    if (pointers.size === 0) {
      prevPinchDist = 0;
      onDragStateChange?.(false);
    } else if (pointers.size === 1) {
      prevPinchDist = 0;
    }
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    onZoom(e.deltaY * zoomSpeed);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    // Avoid triggering when user is typing in an input or textarea
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault();
        onRotate(-0.06, 0);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault();
        onRotate(0.06, 0);
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault();
        onRotate(0, -0.06);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        onRotate(0, 0.06);
        break;
      case '+':
      case '=':
      case ']':
        e.preventDefault();
        onZoom(-0.8);
        break;
      case '-':
      case '_':
      case '[':
        e.preventDefault();
        onZoom(0.8);
        break;
      case ' ':
        e.preventDefault();
        onToggleAutoRotate?.();
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        onReset?.();
        break;
    }
  };

  domElement.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  domElement.addEventListener('wheel', onWheel, { passive: false });

  // Make domElement focusable for keyboard controls if not already
  if (!domElement.hasAttribute('tabindex')) {
    domElement.setAttribute('tabindex', '0');
  }
  domElement.addEventListener('keydown', onKeyDown);

  return () => {
    domElement.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    domElement.removeEventListener('wheel', onWheel);
    domElement.removeEventListener('keydown', onKeyDown);
    pointers.clear();
  };
}
