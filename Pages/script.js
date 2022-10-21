async function test() {
    console.log("test");
}
projecttag("all")
function projecttag(c) {
    var x, i;
    x = document.getElementsByClassName("project-cont");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}
// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


//Projects
const projectsContainer = document.getElementById("projects");

// Fetches all projects from api
const getAllProjects = () => {
    const fetchPromise = fetch(`https://localhost:5000/webapi/GetAllProjects`,
        {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "https://localhost:5000/webapi/GetAllProjects"
            }
        }
    );
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => showAllProjects(data));
}

const showAllProjects = (projects) => {
    // Loops through each project to create a project card
    projects.map(function (project) {
        // Fetch the corresponding image
        fetch(`https://localhost:5000/webapi/GetProjectImage/${project.id}`)
            .then((response) => response.blob())
            .then((imageBlob) => {
                // Create the card with a div element
                const card = document.createElement("div");
                card.classList = "card col-3";
                card.id = project.id;
                // Create an image element
                const image = document.createElement("img");
                const imageObjectURL = URL.createObjectURL(imageBlob);
                image.src = imageObjectURL;
                image.alt = `Image of ${project.projectName}`;
                image.height = 150;
                // Create the title
                const title = document.createElement("h4");
                title.classList = "line-clamp-1";
                title.innerHTML = project.projectName;

                // Create the description text
                const projectOverview = document.createElement("p");
                projectOverview.classList = `line-clamp-3 justify ${project.id}-desc`;
                projectOverview.innerHTML = project.projectOverview;
                //button
                const button = document.createElement("button");
                button.classList = `proj-btn ${project.id}-btn`;
                card.addEventListener("click", function () {
                    loadIndividualProject(project.id);
                  });
                button.innerHTML = "View More";
                // Place all the elements in the card div
                card.append(image, title, projectOverview, button);
                projectsContainer.append(card);
            });
    });
};

const loadIndividualProject = (id) => {
    const fetchPromise = fetch(`https://localhost:5000/webapi/GetProject/` + id,
        {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "https://localhost:5000/webapi/GetProject/"+id
            },
            
        }
    );
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => showProject(data));
}

const showProject = (project) => {
    console.log(project);
    document.getElementById("projectModal").style.display = "block";
    document.getElementById(
        "modal-text"
    ).innerHTML = `
        <div class="modal-fs" role="document">
            <div class="modal-content2">
                <div class="modal-body" style="padding: 0;">
                    <!--header-->
                    <div class="header" style="border-radius: 15px;">
                        <div>
                            <button type="button" class="close" onclick="projectModal.style.display='none'" data-dismiss="modal" aria-hidden="true" style="font-size: 3.5em; color: white;" aria-label="Close">&times</button>
                        </div>
                        <div style="text-align: center;">
                            <h1 style="font-weight: bold; font-size: 5em; ">${project.teamName}</h1>
                            <p style="padding: 15px;">By</p>
                            <p></p>
                            <h4>Users go here. </h4>
                        </div>
                        <div>
                            <button type="button" class="close" onclick="projectModal.style.display='none'" data-dismiss="modal" aria-hidden="true" style="font-size: 3.5em; color: white;" aria-label="Close">&times</button>
                        </div>
                    </div>
                    <!--body-->
                    <div>
                        <div class="flex-container" style="padding-left: 0px; padding-right: 0px;">
                            
                            <div class="lineup">
                                <h1 style="font-size: 2.7em; font-weight: bold;">Blurb</h1>
                                <p></p>
                                <p style="font-size: 1.5em;">
                                    ${project.projectOverview}
                                </p>
                            </div>

                            <div class="flex-container centered-div" style="min-width: 0; width: 100%;">
                                <iframe width="1000" height="563" src="${project.video}"></iframe>  
                            </div>

                            <div class="lineup">
                                <h2 style="font-weight: bold; font-size: 2em;">Approach</h2>
                                <p></p>
                                <p style="font-size: 1.5em;">
                                    ${project.approach}
                                </p>
                            </div>

                            <div style="min-width: 0;"">
                                <div style="text-align: center;">
                                    <img style=" height: auto; width: 100%;" width="500" height="563" id="showcaseimg" src="https://localhost:5000/webapi/GetProjectImage/${project.id}" alt="Showcase Poster" />
                                </div>
                            </div>

                            <div class="lineup">
                                <h2 style="font-weight: bold; font-size: 2em;">Future Plans</h2>
                                <p></p>
                                <p style="font-size: 1.5em;">
                                    ${project.finalThoughts}
                                </p>
                            </div>
                            <hr>

                            <div class="flex-container lineup" id="comment">
                                <h2 style="font-weight: bold; font-size: 2em;">Leave a Comment</h2>
                                <hr />
                                <form id="commentForm">
                                    <div class="commentfields">
                                        <input name="name" id="cname" class="required" type="text" size = "30" maxlength="23" Placeholder="Your Real Name"/>
                                    </div>
                                    <!--
                                    <div class="commentfields">
                                        <input name="email" id="cemail" class="required" size="30" maxlength="35" type="email" placeholder="Email" />
                                    </div>-->
                                    <div class="commentfields">
                                        <textarea id="ccomment" class="required textarea" name="comment" placeholder="Your comment"></textarea>
                                    </div>
                                    <div style="font-size: 1.5em;">
                                        <button id="commentButton" type="submit" name="submit" size="30" style=" border-radius: 10px;" onclick = "submitComment(${project.id}); showProject(${project.id})">Submit Comment</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `;
}

//Login and register functions. 
function register() {
    const fullnameText = document.getElementById("fullname").value;
    const emailText = document.getElementById("reg-email").value;
    const passwordText = document.getElementById("reg-pwd").value
    const userJSON = {
        FullName: fullnameText,
        Email: emailText,
        Password: passwordText
    }
    fetch(`https://localhost:5000/webapi/RegisterVisitor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://localhost:5000/webapi/RegisterVisitor"
        },
        body: JSON.stringify(userJSON)
    })
    .then(response => response.text())
    .then(data => alert(data))
}

function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-pwd").value;

    fetch(`https://localhost:5000/webapi/GetAuth/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/html",
            "Authorization": "Basic " + btoa(`${email}:${password}`),
            "Accept": "application/xml"
        }
    })
    .then(response => {
        if (response.ok) {
            localStorage.setItem("auth", "true");
            response.text().then(data => {
                localStorage.ID = data;
            })

        }
        else {
            alert("Login Unsuccessful")
        }
        console.log(localStorage.auth); console.log(localStorage.ID);
    })
}

function logout() {
    localStorage.setItem("auth", "false");
    document.getElementById("login").style.display = "inline";
    document.getElementById("sign-up").style.display = "inline";
    document.getElementById("logout").style.display = "none";
    localStorage.removeItem("ID");
}

function checkUser() {
    if (localStorage.getItem("auth") == "true") {
        document.getElementById("login").style.display = "none";
        document.getElementById("sign-up").style.display = "none";
        document.getElementById("logout").style.display = "inline";
    }
}


// Likes
function like(project_id) {
    var user_id = localStorage.getItem("ID");
    const likeJSON = {
        ProjectID: project_id,
        UserID: user_id,
    }

    fetch(`https://localhost:5000/webapi/LikeProject`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `https://localhost:5000/webapi/LikeProject`
        },
        body: JSON.stringify(likeJSON)
    })
    .then(response => {
        if (response.ok) {
            var element = document.getElementById(project_id);
            element.classList.toggle("liked");
            email = localStorage.getItem("email")
        }
    });
}


//Comments
const submitComment = (id) => {
    const comment = document.getElementById('ccomment').value;
    
    document.getElementById('comment').value = "";
    //FullName = localStorage.getItem("FullName")
    FullName = "Test"
    const commentJSON = {
        CommentText: comment,
        ProjectID: id,
        FullName: FullName
    }
    fetch(`https://localhost:5000/webapi/WriteComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `https://localhost:5000/webapi/WriteComment`
        },
        body: JSON.stringify(commentJSON),
    });
}