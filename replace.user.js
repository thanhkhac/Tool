// ==UserScript==
// @name         Replace FindNest with yardsale
// @namespace    http://tampermonkey.net/
// @version      2025-03-14
// @description  Auto replace
// @author       You
// @match        https://analytics.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/findnest/gi, 'yardsale');
        } else {
            for (const child of node.childNodes) {
                replaceText(child);
            }
        }
    }

    function observeChanges() {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    replaceText(node);
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.addEventListener('load', () => {
        replaceText(document.body);
        observeChanges();
    });
})();
