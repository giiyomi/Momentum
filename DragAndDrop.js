const draggable = document.getElementById('weather-app-container');
const container = document.getElementById('screen'); // or manually get the wrapper

dragElement(draggable, screen);

function dragElement(element, container) {
  let offsetX = 0, offsetY = 0;

  element.addEventListener('mousedown', startDrag);
  element.addEventListener('touchstart', startDrag, { passive: false });

  function startDrag(e) {

    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
    }

    element.style.cursor = "grabbing"
    e.preventDefault();
    const rect = element.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches[0].clientX;
    const clientY = e.clientY ?? e.touches[0].clientY;

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);
  }

  function drag(e) {
    e.preventDefault();

    const containerRect = container.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches[0].clientX;
    const clientY = e.clientY ?? e.touches[0].clientY;

    let newLeft = clientX - containerRect.left - offsetX;
    let newTop = clientY - containerRect.top - offsetY;

    // Clamp movement inside container
    newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - element.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, container.clientHeight - element.offsetHeight));

    element.style.left = newLeft + "px";
    element.style.top = newTop + "px";
  }

  function stopDrag() {
    element.style.cursor = "grab"
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', stopDrag);
  }
}