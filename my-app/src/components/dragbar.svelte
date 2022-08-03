<script type="ts">
	import { onMount } from 'svelte';
	export let id: number;
	export let title: string;
	export let dragAble: boolean;
	export let pinAble: boolean;

	onMount(() => {
		let mousePosition: { x: number; y: number };
		const dragbar = document.querySelector('#' + id);

		const pinElement = dragbar.querySelector('.pin');
		if (pinAble && pinElement) {
			pinElement.addEventListener('click', () => {
				dragbar.parentNode.parentNode.classList.toggle('pinned');
			});
		}

		const closeElement = dragbar.querySelector('.close');
		if (closeElement) {
			closeElement.addEventListener('click', () => {
				resetDragbarPosition();
			});
		}

		//get initial position of dragbar.parentElement
		let dragbarParentPosition = {
			x: dragbar.parentElement.offsetLeft,
			y: dragbar.parentElement.offsetTop
		};

		function setDragbarPosition() {
			dragbarParentPosition = {
				x: dragbar.parentElement.offsetLeft,
				y: dragbar.parentElement.offsetTop
			};
		}

		function resetDragbarPosition() {
			if (!dragbar.parentElement.parentElement.classList.contains('pinned')) {
				dragbar.parentElement.parentElement.classList.remove('active');

				setTimeout(() => {
					dragbar.parentElement.style.left = dragbarParentPosition.x + 'px';
					dragbar.parentElement.style.top = dragbarParentPosition.y + 'px';
				}, 175);
			} else {
				dragbar.parentElement.style.left = dragbarParentPosition.x + 'px';
				dragbar.parentElement.style.top = dragbarParentPosition.y + 'px';
			}
		}

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

				//clamp the pos3 and pos4 to the window size
				const bounds = elmnt.getBoundingClientRect();
				const windowWidth = window.innerWidth;
				const windowHeight = window.innerHeight;

				const elementTopPos = elmnt.offsetTop - pos2;
				const elementLeftPos = elmnt.offsetLeft - pos1;

				if (mousePosition.y < 10) {
				} else {
					if (mousePosition.y > windowHeight - 10) {
					} else {
						elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
					}
				}

				if (mousePosition.x < 50) {
				} else {
					if (mousePosition.x > windowWidth - 50) {
					} else {
						elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
					}
				}

				elmnt.style.right = elmnt.offsetRight - pos1 + 'px';
				elmnt.style.bottom = elmnt.offsetBottom - pos2 + 'px';
			}

			function closeDragElement() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
		}

		if (dragAble) {
			dragElement(dragbar.parentElement);

			document.addEventListener('mousemove', (event) => {
				mousePosition = {
					x: event.clientX,
					y: event.clientY
				};
			});
		} else {
			dragbar?.classList.add('default-cursor');
		}
	});
</script>

<div {id} class="w-100 dragbar d-flex justify-content-between">
	{#if pinAble}
		<div class="left">
			<div class="option pin">P</div>
		</div>
	{/if}
	<div class="center">
		<p>{title}</p>
	</div>
	<div class="right">
		<div class="option close">X</div>
	</div>
</div>
