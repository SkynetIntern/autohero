<script type="ts">
	import { onMount } from 'svelte';
	export let id: string;
	export let title: string;
	export let dragAble: boolean;
	export let pinAble: boolean;

	onMount(() => {
		let mousePosition: { x: number; y: number };
		const dragbar = document.querySelector('#' + id);
		if (!dragbar) return;
		const pinElement = dragbar.querySelector('.pin');
		if (pinAble && pinElement) {
			pinElement.addEventListener('click', () => {
				//@ts-ignore
				dragbar.parentNode?.parentNode?.classList.toggle('pinned');
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
			x: dragbar.parentElement?.offsetLeft,
			y: dragbar.parentElement?.offsetTop
		};

		function setDragbarPosition() {
			if (!dragbar) return;
			dragbarParentPosition = {
				x: dragbar.parentElement?.offsetLeft,
				y: dragbar.parentElement?.offsetTop
			};
		}

		function resetDragbarPosition() {
			if (!dragbar) return;
			if (!dragbar.parentElement?.parentElement?.classList.contains('pinned')) {
				dragbar.parentElement?.parentElement?.classList.remove('active');

				setTimeout(() => {
					//@ts-ignore
					dragbar.parentElement.style.left = dragbarParentPosition.x + 'px';
					//@ts-ignore
					dragbar.parentElement.style.top = dragbarParentPosition.y + 'px';
				}, 175);
			} else {
				dragbar.parentElement.style.left = dragbarParentPosition.x + 'px';
				dragbar.parentElement.style.top = dragbarParentPosition.y + 'px';
			}
		}

		function dragElement(elmnt: any) {
			let pos1 = 0,
				pos2 = 0,
				pos3 = 0,
				pos4 = 0;

			if (dragbar) {
				//@ts-ignore
				dragbar.onmousedown = dragMouseDown;
			} else {
				elmnt.onmousedown = dragMouseDown;
			}

			function dragMouseDown(e: MouseEvent) {
				e = e || window.event;
				e.preventDefault();
				// get the mouse cursor position at startup:
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				// call a function whenever the cursor moves:
				document.onmousemove = elementDrag;
			}

			function elementDrag(e: MouseEvent) {
				e = e || window.event;
				e.preventDefault();
				// calculate the new cursor position:
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;

				//clamp the pos3 and pos4 to the window size
				const windowWidth = window.innerWidth;
				const windowHeight = window.innerHeight;

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
