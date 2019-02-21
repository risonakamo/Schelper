window.onload=main;
var _imageUrls; //sorted array of result image urls

function main()
{
    //grab original image href from all sankaku tabs
    var sourceSelect=document.querySelector(".source-select");
    var tabs; //result of tabs query, saved

    chrome.tabs.query({
        currentWindow:true,
        url:"*://chan.sankakucomplex.com/post/show/*"
    },(tabss)=>{
        tabs=tabss;

        if (tabs.length==0)
        {
            document.querySelector(".sankaku-active").classList.add("inactive");
            document.querySelector(".sankaku-inactive").classList.remove("inactive");
            return;
        }

        //modified width for no scrollbar
        if (tabs.length<=6)
        {
            sourceSelect.classList.add("low-image-count");
        }

        //execute script on all sankaku tabs, collect results in handleTabs()
        //they need to be processed async as they come in an incorrect order
        //and we care about order.
        var resultImages=[];
        tabs.forEach((x)=>{
            chrome.tabs.executeScript(x.id,{file:"openoriginal.js",runAt:"document_end"},(res)=>{
                resultImages.push({image:res[0],index:x.index});
                handleTabs(resultImages,tabs.length,sourceSelect);
            });
        });
    });

    document.querySelector(".open-source-all").addEventListener("click",(e)=>{
        e.preventDefault();
        openAllSource();
    });

    document.querySelector(".fit-window-all").addEventListener("click",(e)=>{
        e.preventDefault();
        fitWindowAll(tabs);
    });

    document.querySelector(".close-posts-all").addEventListener("click",(e)=>{
        e.preventDefault();
        closeAllPosts();
    });

    document.querySelector(".close-source-all").addEventListener("click",(e)=>{
        e.preventDefault();
        closeAllPosts(1);
    });

    dropZoneActions();
}

//async handling of tab script results, so they can be sorted in the correct order
function handleTabs(inputResults,tabLength,sourceSelect)
{
    if (inputResults.length!=tabLength)
    {
        return;
    }

    _imageUrls=inputResults;

    inputResults.sort((a,b)=>{
        return a.index-b.index;
    });

    for (var x=0,l=inputResults.length;x<l;x++)
    {
        sourceSelect.appendChild(genSourcePreview(inputResults[x].image));
    }
}

//call resize_image on all sankaku image pages
function fitWindowAll(tabs)
{
    for (var x=0,l=tabs.length;x<l;x++)
    {
        chrome.tabs.executeScript(tabs[x].id,{file:"fitwindowall-pre.js",runAt:"document_end"});
    }
}

//open all source image urls in new tabs
function openAllSource()
{
    for (var x=0,l=_imageUrls.length;x<l;x++)
    {
        chrome.tabs.create({url:_imageUrls[x].image,active:false});
    }
}

//close all sankaku image post pages.
//if original set true, close all image source pages instead.
function closeAllPosts(original)
{
    var url="*://chan.sankakucomplex.com/post/show/*";

    if (original)
    {
        url="https://cs.sankakucomplex.com/data/*";
    }

    chrome.tabs.query({
        currentWindow:true,
        url:url
    },(tabs)=>{
        for (var x=0,l=tabs.length;x<l;x++)
        {
            chrome.tabs.remove(tabs[x].id);
        }
    });
}

//give it the full sankaku source link to generate a preview element
function genSourcePreview(sourceLink)
{
    var a=document.createElement("div");
    a.innerHTML=`<div class="source-preview"><img src="https://cs.sankakucomplex.com/data/preview/${sourceLink.split("data/")[1].replace(/\..*/,".jpg")}"></div>`;
    return a.firstChild;
}

var dragOpenPath;

//set the dragOpen. input must be a String.raw
function setDragOpenPath(path)
{
    dragOpenPath=path.replace(/\\/g,"/");
    console.log(dragOpenPath);
}

//setup drop zone actions/events
function dropZoneActions()
{
    var body=document.body;

    body.addEventListener("dragover",(e)=>{
        e.preventDefault();
    });

    body.addEventListener("drop",(e)=>{
        e.preventDefault();

        if (!dragOpenPath)
        {
            return;
        }

        var dataFiles=e.dataTransfer.files;
        var files=[];

        for (var x=0,l=dataFiles.length;x<l;x++)
        {
            files.push(dataFiles[x].name);
        }

        var numReg=/\d+/;

        files.sort((a,b)=>{
            var a=parseInt(a.match(numReg)[0]);
            var b=parseInt(b.match(numReg)[0]);

            if (a>b)
            {
                return 1;
            }

            else if (a<b)
            {
                return -1;
            }

            return 0;
        });

        for (var x=0,l=files.length;x<l;x++)
        {
            chrome.tabs.create({
                url:`file:///${dragOpenPath}/${files[x]}`,
                active:false
            },(tab)=>{
                chrome.tabs.executeScript(tab.id,{file:"dragopenactions.js"});
            });
        }
    });
}