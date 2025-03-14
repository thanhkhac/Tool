// ==UserScript==
// @name         replace findnest & nguyen khac thanh (live)
// @namespace    http://tampermonkey.net/
// @version      2025-03-14
// @description  auto replace multiple words on google analytics (case-insensitive, runs continuously)
// @author       you
// @match        https://analytics.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent
                .replace(/findnest/gi, 'yardsale')
                .replace(/nguyen khac thanh/gi, 'fpt')
                .replace(/\/post\/details/gi, '/payment')
                .replace(/\bpost\b/gi, 'products')  // đảm bảo chỉ thay đổi từ 'post' độc lập
                .replace(/\/products\/userpost/gi, '/products/update')
                .replace(/\/admin\/products\/waiting/gi, '/admin/products/manage')
                .replace(/\/identity\/account\/manage/gi, 'account/manage')
                .replace(/\/identity\/account\/login/gi, '/login')
                .replace(/\/identity\/account\/register/gi, '/identity/account')
                .replace(/\/products\/create/gi, '/products/create') // chuyển Create thành create
                .replace(/\/admin\/products/gi, '/admin/products') // chuyển Admin/products thành admin/products
                .replace(/đăng tin mới/gi, 'sản phẩm mới'); // thay "Đăng tin mới" thành "Sản phẩm mới"
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (const child of node.childNodes) {
                replaceText(child);
            }
        }
    }

    function observeChanges() {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                mutation.addedNodes.forEach(node => replaceText(node));
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // chạy ngay lập tức và quan sát liên tục
    replaceText(document.body);
    observeChanges();

})();
