<script>
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelectorAll('.dragbar').forEach((dragbar) => {
			dragbar.querySelector('.pin').addEventListener('click', () => {
				dragbar.parentNode.parentNode.classList.toggle('pinned');
			});

			function dragElement(elmnt) {
				let pos1 = 0,
					pos2 = 0,
					pos3 = 0,
					pos4 = 0;
				if (dragbar) {
					/* if present, the header is where you move the DIV from:*/
					dragbar.onmousedown = dragMouseDown;
				} else {
					/* otherwise, move the DIV from anywhere inside the DIV:*/
					elmnt.onmousedown = dragMouseDown;
				}

				function dragMouseDown(e) {
					e = e || window.event;
					e.preventDefault();
					// get the mouse cursor position at startup:
					pos3 = e.clientX;
					pos4 = e.clientY;
					document.onmouseup = closeDragElement;
					// call a function whenever the cursor moves:
					document.onmousemove = elementDrag;
				}

				function elementDrag(e) {
					e = e || window.event;
					e.preventDefault();
					// calculate the new cursor position:
					pos1 = pos3 - e.clientX;
					pos2 = pos4 - e.clientY;
					pos3 = e.clientX;
					pos4 = e.clientY;

					//clamp the position to be inside the window
					console.log(pos1, pos2, pos3, pos4);

					elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
					elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
					elmnt.style.right = elmnt.offsetRight - pos1 + 'px !important';
					elmnt.style.bottom = elmnt.offsetBottom - pos2 + 'px';
				}

				function closeDragElement() {
					document.onmouseup = null;
					document.onmousemove = null;
				}
			}

			dragElement(dragbar.parentElement);
		});
	});
</script>

<div class="w-100 dragbar d-flex justify-content-between">
	<div class="left">
		<div class="option pin">P</div>
	</div>
	<div class="right">
		<div class="option openwindow">F</div>
		<div class="option close">X</div>
	</div>
</div>
