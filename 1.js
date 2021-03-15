// ==UserScript==
// @name         下载微信公众号文章
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       liuemmm
// @match        https://mp.weixin.qq.com/s/*
// @grant        none
// ==/UserScript==

(function() {
    function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        pom.click();
    }
    let btn=document.createElement("button");
    btn.innerText="下载";
    btn.style="position:fixed; z-index:999;top:0;left:0;"
    btn.onclick=function(){
        var oMeta = document.createElement('meta');
        oMeta.content = 'never';
        oMeta.name = 'referrer';
        document.getElementsByTagName('head')[0].appendChild(oMeta);
        // 加载非webp图片，部分webp ios上会显示不出来。移除img跨域配置crossorigin
        let list = document.querySelectorAll('img');
        for (let i = 0; i < list.length; i++) {
            // 设置src
            list[i].setAttribute('src',list[i].dataset.src);
            // 由于懒加载，图片被设置了visibility:hidden 去掉样式显示图片;
            list[i].setAttribute('style','');
            list[i].setAttribute('src', list[i].getAttribute('src').split('?')[0]);
            list[i].removeAttribute('crossorigin');
        }
        // 去掉二维码
        let js_pc_qr_code=document.getElementById('js_pc_qr_code');
        js_pc_qr_code.innerHTML='';
        // 去掉下载按钮
        let txt=document.children[0].innerHTML.replace(/\<button.*下载\<\/button\>/,'');
        download(document.title+'.html',txt);
    }
    document.body.appendChild(btn);
})();
