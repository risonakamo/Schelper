//when on a folder tab, grabs filenames and filepaths of all files present
//and sends it back as an array, where each file is an object {name,path}
(()=>{
    var fileElements=document.querySelectorAll("tr");

    var fileElement;
    var files=[];
    for (var x=1,l=fileElements.length;x<l;x++)
    {
        fileElement=fileElements[x].firstChild.firstChild;

        files.push({name:fileElement.innerText,path:fileElement.href});
    }

    files.sort((a,b)=>{
        return a.name.localeCompare(b.name,undefined,{numeric:true});
    });

    return files;
})()