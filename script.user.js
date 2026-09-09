// ==UserScript==
// @name        Severa Calendar Presentation Mode
// @namespace   WTF Design
// @icon        data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230974b3'%3E%3Cpath d='m24 16v-2h-2v-11a3 3 0 0 0 -3-3h-14a3 3 0 0 0 -3 3v11h-2v2h11v4h-2a3 3 0 0 0 -3 3v1h2v-1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1h2v-1a3 3 0 0 0 -3-3h-2v-4zm-20-13a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v11h-16z'/%3E%3C/svg%3E
// @version     1.2.0
// @match       https://severa.visma.com/*
// @grant       none
// @author      WTF-Design
// @description Adds a presentation view mode button to Severa Calendar.
// ==/UserScript==

// Mir-Ismaili's location changeState proxy from https://stackoverflow.com/a/68418536
// Used under CC BY-SA 4.0
["pushState", "replaceState"].forEach(changeState => {
	// store original values under underscored keys
	window.history['_' + changeState] = window.history[changeState];

	window.history[changeState] = new Proxy(window.history[changeState], {
		apply (target, thisArg, argList) {
			const [state, title, url] = argList;
			onChangeState(state, title, url, changeState === "replaceState");

			return target.apply(thisArg, argList);
		},
	})
})

const app = document.getElementById("app");
const style = document.createElement("style");
const presentButton = document.createElement("input");
let calendarView;
let buttonWrapper;
let debounce;

style.textContent = `
	body {
		& > * {
			transition: opacity .2s;
		}
		&:has(> #loader) > * {
			opacity: 0;
		}
		&:has(#presentButton:checked) {
			anchor: --presentation-view;
			.content-main > :has(> .calendarview) {
				position-anchor: --presentation-view;
				position: absolute;
				z-index: 11;
				margin: 0;
				inset: 0;
				padding-block: 0;
			}
			.calendarview .dayentry-title {
				font-size: 13px;
			}
		}
	}
	#presentButton {
		appearance: none;
		margin-inline: .2rem;
		padding-inline: 10px;
		&::before {
			content: "";
			width: 16px;
			height: 16px;
			background-image: url("${GM.info.script.icon}");
		}
	}
`;
document.head.appendChild(style);

Object.assign(presentButton, {
	type: "checkbox",
	id: "presentButton",
	classList: "btn only-icon",
	checked: !!sessionStorage.getItem("calendarPresentationMode"),
});

const onChangeState = (state, title, url, isReplace) => {

	if (!/\/schedule(\/calendar)?$/.test(url)) return false;

	if (!!document.getElementById("presentButton")) return false;

	clearTimeout(debounce);
	debounce = setTimeout(() => {
		if (calendarView = app.querySelector(`.content-main .calendarview`)) {
			buttonWrapper = calendarView.querySelector(`.calendar-control-btn-wrapper`);
			buttonWrapper.appendChild(presentButton);
			presentButton.addEventListener("change", ev => {
				if (ev.target.checked) sessionStorage.setItem("calendarPresentationMode", true);
				else sessionStorage.removeItem("calendarPresentationMode");
			});
		}
	}, 333);

}
