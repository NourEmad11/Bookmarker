// html elements
var siteNameId = document.getElementById("siteNameId");
var siteUrlId = document.getElementById("siteUrlId");
var tableBody = document.getElementById("tableBody");
// Variables
if(localStorage.getItem("bookmark")!== null){
    var bookmarks = JSON.parse(localStorage.getItem("bookmark"));
    displayAll();
}else{
var bookmarks =[];
}
var siteNameRegex = /^[A-za-z0-9]{3,}$/;
var siteUrlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{2,}\.com(\/.*)?$/;

//functions
function addBookmark(){
    var isvalid = validate(siteNameRegex,siteNameId) && validate(siteUrlRegex,siteUrlId);
    if(isvalid == true){
        
        var websiteUrl = normalizeUrl(siteUrlId.value);
        
        var bookmark = {
        websiteName: siteNameId.value,
        websiteUrl: websiteUrl,
    
        };
        bookmarks.push(bookmark);
        Swal.fire({
            
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        localStorage.setItem("bookmark",JSON.stringify(bookmarks))
        displayBookmarks(bookmarks.length-1)
    }else{
        Swal.fire({
            icon: "error",
            title: "Site Name or Url is not valid, Please follow the rules below :",
            html: `
              <div style="text-align:left; font-size:16px; line-height:1.6;">
                <p style="margin:0 0 10px 0;">
                  <i class="fa-solid fa-circle-xmark" style="color:#e74c3c; margin-right:6px;"></i>
                  Site name must contain at least <b>3 characters</b>
                </p>
                <p style="margin:0;">
                  <i class="fa-solid fa-circle-xmark" style="color:#e74c3c; margin-right:6px;"></i>
                  Site URL must be a <b>valid one</b>
                </p>
              </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
              popup: "custom-alert",
              title: "custom-title"
            }
          });
          

    }
}
function displayBookmarks(index) {
    var tableHtml = ` 
            <tr>
                <th scope="row"> ${index +1 }</th>
                <td> ${bookmarks[index].websiteName}</td>
                <td><a href="${bookmarks[index].websiteUrl}" target="_blank" class="visit-btn mt-1"><i class="fa-regular fa-eye"></i> Visit</a></td>
                <td><button class="delete-btn mt-1" onclick="deleteBookmark(${index})"><i class="fa-solid fa-trash"></i> Delete</button></td>

            </tr>
            ` ;
    tableBody.innerHTML += tableHtml;
   
}
function displayAll(){
    for( var i=0; i< bookmarks.length ; i++){
        displayBookmarks(i)
    }
}
function deleteBookmark(index){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            bookmarks.splice(index,1);
            localStorage.setItem("bookmark",JSON.stringify(bookmarks))
            tableBody.innerHTML=" ";
            displayAll();
           
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      }); }
function validate(regex, element) {
    if (regex.test(element.value)) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false;
    }
}
function normalizeUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }
    return url;
}