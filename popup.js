window.onload=main;

function main()
{
    chrome.tabs.query({
        currentWindow:true,
        url:"*://chan.sankakucomplex.com/post/show/*"
    },(tabs)=>{
        for (var x=0,l=tabs.length;x<l;x++)
        {
            chrome.tabs.executeScript(tabs[x].id,{file:"openoriginal.js",runAt:"document_end"},(res)=>{
                console.log(res[0]);
            });
        }
    });
}
