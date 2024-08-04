async function getUserData(user) {
    try {
        let response = await fetch(`https://api.github.com/users/${user}`)

        if(! response.ok) {
            throw new Error('Could not fetch resource');
        }

        let data = await response.json();

        console.log(data);

    } catch(err) {
        console.error(err);
    }
}

const searchInput = document.querySelector('#search');
const resultContainer = document.querySelector('.result');
const resultText = document.querySelector('.result-text');
const userDisplayContainer = document.querySelector('.user-display');
const avatar = document.querySelector('.avatar');
const displayName = document.querySelector('.name');
const username = document.querySelector('.username');
const bio = document.querySelector('.bio');
const profileUrl = document.querySelector('.profile-url');
const repoTxt = document.querySelector('.repo-txt');

searchInput.addEventListener('keyup', async (ev) => {
    if(ev.key === 'Enter' && ev.target.value !== '') {
        // getUserData(ev.target.value);
        resultContainer.style.display = 'block';

        // console.log(repoTxt.textContent = `boang ka ba`)

        try {
            let response = await fetch(`https://api.github.com/users/${ev.target.value}`)
    
            if(! response.ok) {
                throw new Error('Could not fetch resource');
            }
            
            userDisplayContainer.style.display = 'block';
            resultText.innerHTML = 'We found the user! &#x1F389;'
    
            let data = await response.json();

            avatar.setAttribute('src', data.avatar_url);
            displayName.textContent = data.name;
            username.textContent = data.login;
            bio.textContent = data.bio;
            profileUrl.setAttribute('href', data.html_url);
            repoTxt.textContent = `${data.name ?? data.login} has ${data.public_repos} repositories. Check them out!`
    
            console.log(data);
    
        } catch(err) {
            // console.error(err);
            userDisplayContainer.style.display = 'none';
            resultText.innerHTML = "Sorry, we couln't find the user";
        }
    }
})


// fetch("https://api.github.com/users/rossensei/")
//     .then(response => response.ok ? response.json() : new Error('Resource cannot be found.'))
//     .then(data => console.log(data));