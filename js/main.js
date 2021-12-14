function createElemWithText(nameOfElToBeCreated = "p", textContentOfCreatedEl = "", className = "") {
    let newlyCreatedElWithText = document.createElement(nameOfElToBeCreated);

    newlyCreatedElWithText.textContent = textContentOfCreatedEl;
    newlyCreatedElWithText.className = className;
      
    return newlyCreatedElWithText;
}

const getAllUsers = async () => {
  
  const response = await fetch (" https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
}


function createSelectOptions(users){
    if(users === undefined || users  === null){
        return undefined
    }

    let optionArray = []
    let user

    
    for(user of users){
        console.log(user)
        var opt = document.createElement('option');
        opt.value = user.id;
        opt.innerHTML = user.name;

        optionArray.push(opt)

    }


    return optionArray

}

 function toggleCommentSection(postId) {
           
            if (!postId) {
                return undefined;
            } else {
                const commentSections = document.querySelectorAll('[data-post-id]');
                for (let i = 0; i < commentSections.length; i++) {
                    const commentSection = commentSections[i];
    
                    if (commentSection.getAttribute('data-post-id') === postId) {
                        commentSection.classList.toggle('hide');
                        return commentSection;
                    }
                }

                return null;
            }   
        }

function toggleCommentButton (postID) {

    
    if (!postID) {
      return;
    }
  
    const btnSelectedEl = document.querySelector(`button[data-post-id = "${postID}"`);
  
    if (btnSelectedEl != null) {
      btnSelectedEl.textContent === "Show Comments" ? (btnSelectedEl.textContent = "Hide Comments") : (btnSelectedEl.textContent = "Show Comments");
    }
  

    return btnSelectedEl;
  };

 function deleteChildElements(parentElement) {
        let child = parentElement.lastElementChild;
        while (child) {
          parentElement.removeChild(child);
          child = parentElement.lastElementChild;
        }
        return parentElement;
      }

const addButtonListeners = () => {
    let myMainElem = document.querySelector('main')
    let buttonsList = myMainElem.querySelectorAll('button')
    if(buttonsList){
        for(let i = 0; i < buttonsList.length; i++){
            let myButton = buttonsList[i]
            let postId = myButton.dataset.postId
            myButton.addEventListener('click', function(event){
                toggleComments(event, postId), false
            })
        }
        return buttonsList
    }

}

const removeButtonListeners = () => {
    let myMainElem = document.querySelector('main')
    let buttonsList = myMainElem.querySelectorAll('button')
    console.log(buttonsList)
    if(buttonsList){
        for(let i = 0; i < buttonsList.length; i++){
            let myButton = buttonsList[i]
            let postId = myButton.dataset.postId
            myButton.removeEventListener('click', function(event){ 
            toggleComments(event, postId), false
        })
        }
        return buttonsList
    }
}


function createComments(comments) {
     
      if (!comments) {
        return undefined;
      }
      
      let frag = document.createDocumentFragment();

      for (let i = 0; i < comments.length; i++) {
        const element = comments[i];
        
        let a = document.createElement("a");
   
        let h3 = createElemWithText("h3", comments.name);
        
        let p1 = createElemWithText("p", comments.body);
 
        let p2 = createElemWithText("p", `From: ${comments.email}`);
  
        a.appendChild(h3);
        a.appendChild(p1);
        a.appendChild(p2);
     
        frag.appendChild(a);
      }
      return frag;
    }


function populateSelectMenu(users) {

    if (!users) return;
    let menu = document.querySelector("#selectMenu");

    let options = createSelectOptions(users);

    
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        menu.append(option);
    } 

    return menu;

} 


let getUsers = async() => {

        let retrieve;
        
        try {
            retrieve = await fetch("https://jsonplaceholder.typicode.com/users");
        } 
        catch (error) {
            console.log(error);
        } 

        return await retrieve.json();

    } 


let getUserPosts = async(userId) => {

     
        if (!userId) return;

        let retrieve;

        try {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        } 
        catch (error) {
            console.log(error);
        } 

        return retrieve.json();

    } 


let getUser = async(userId) => {

    
        if (!userId) return;

        let retrieve;

        try {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        } 
        catch (error) {
            console.log(error);
        } 

        return retrieve.json();

    } 


const getPostComments = async (postId) => {
          if(!postId) return;
          try {
              const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
              const jsonPostComments = await response.json();
              return jsonPostComments;
              } catch(error){
                  console.log(error);
          }
      }


const displayComments = async (postId) => {
    if (!postId){
        return undefined;
    }
    let mySection = document.createElement("section");
    mySection.dataset.postId = postId;
    mySection.classList.add("comments", "hide");
    let comments = await getPostComments(postId);
    let fragment = createComments(comments);
    mySection.append(fragment);
    return mySection;
}


const createPosts = async (jsonPosts) => {
    if(!jsonPosts) return;

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < jsonPosts.length; i++) {

        let post = jsonPosts[i];

        let article = document.createElement("article");
        let section = await displayComments(post.id);
        let author = await getUser(post.userId);

        let h2 = createElemWithText("h2", post.title);
        let p = createElemWithText("p", post.body);
        let p2 = createElemWithText("p", `Post ID: ${post.id}`);

        let p3 = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
        let p4 = createElemWithText("p", `${author.company.catchPhrase}`);

        let button = createElemWithText("button", "Show Comments");
        button.dataset.postId = post.id;

        article.append(h2, p, p2, p3, p4, button, section); 

        fragment.append(article);
    }
    console.log(fragment);
    return fragment;
};

const displayPosts = async (posts) => {
    let myMain = document.querySelector("main");
    let element = (posts) ? await createPosts(posts) : document.querySelector("main p");
    myMain.append(element);
    return element;
}


function toggleComments(event, postId){
    if (!event || !postId){
        return undefined;
    }
    event.target.listener = true;
    let section  = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    return [section, button];
}



const refreshPosts = async (posts) => {
    if (!posts){
        return undefined;
    }
    let buttons = removeButtonListeners();
    let myMain = deleteChildElements(document.querySelector("main"));
    let fragment = await displayPosts(posts);
    let button = addButtonListeners();
    return [buttons, myMain, fragment, button];
}


const selectMenuChangeEventHandler = async (e) => {
    let userId = e?.target?.value || 1;
    let posts = await getUserPosts(userId);
    let refreshPostsArray = await refreshPosts(posts);
    return [userId, posts, refreshPostsArray];
}


const initPage = async() => {
    let users = await getUsers();
    let select = populateSelectMenu(users);
    return [users, select];
}


function initApp(){
    initPage();
    let select = document.getElementById("selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);
