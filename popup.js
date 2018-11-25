window.onload=main;
var _sankakuImages=[];

function main()
{
    chrome.tabs.query({
        currentWindow:true,
        url:"*://chan.sankakucomplex.com/post/show/*"
    },(tabs)=>{
        for (var x=0,l=tabs.length;x<l;x++)
        {
            chrome.tabs.executeScript(tabs[x].id,{file:"openoriginal.js",runAt:"document_end"},(res)=>{
                _sankakuImages.push(res[0]);
            });
        }

        document.querySelector(".count").innerText=tabs.length;
    });

    document.querySelector(".sankaku-button").addEventListener("click",(e)=>{
        e.preventDefault();

        for (var x=0,l=_sankakuImages.length;x<l;x++)
        {
            chrome.tabs.create({url:_sankakuImages[x],active:false});
        }
    });
}