window.onload=main;

function main()
{
    //grab original image href from all sankaku tabs
    var sourceSelect=document.querySelector(".source-select");
    chrome.tabs.query({
        currentWindow:true,
        url:"*://chan.sankakucomplex.com/post/show/*"
    },(tabs)=>{
        //modified width for no scrollbar
        if (tabs.length<=6)
        {
            sourceSelect.classList.add("low-image-count");
        }

        for (var x=0,l=tabs.length;x<l;x++)
        {
            chrome.tabs.executeScript(tabs[x].id,{file:"openoriginal.js",runAt:"document_end"},(res)=>{
                console.log(res[0]);
                sourceSelect.appendChild(genSourcePreview(res[0]));
            });
        }
    });

    // document.querySelector(".sankaku-button").addEventListener("click",(e)=>{
    //     e.preventDefault();

    //     for (var x=0,l=_sankakuImages.length;x<l;x++)
    //     {
    //         chrome.tabs.create({url:_sankakuImages[x],active:false});
    //     }
    // });
}

//give it the full sankaku source link to generate a preview element
function genSourcePreview(sourceLink)
{
    var a=document.createElement("div");
    a.innerHTML=`<div class="source-preview"><img src="https://cs.sankakucomplex.com/data/preview/${sourceLink.split("data/")[1].replace(/\..*/,".jpg")}"></div>`;
    return a.firstChild;
}