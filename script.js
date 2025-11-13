// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChC_hTGfxHCcegLJnJAmWt-HtZuQqpTtM",
  authDomain: "stelladb-43f14.firebaseapp.com",
  projectId: "stelladb-43f14",
  storageBucket: "stelladb-43f14.firebasestorage.app",
  messagingSenderId: "682373157122",
  appId: "1:682373157122:web:1af34c6d1c7bc4d769721b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google Sign-In
document.getElementById('login-btn').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        console.log('Logged in:', result.user);
        // Save Recruit Records to db.collection('users').doc(user.uid)
    }).catch((error) => console.error(error));
});

// Simple Optimizer Logic (Expand with your metrics)
function optimizeBuild() {
    // Parse roster input, prioritize mono-elements
    const roster = document.querySelector('textarea').value.split(',');
    let optimized = 'Optimized: Mono-AQUA team for burst damage: ' + roster.join(' + ');
    document.getElementById('optimized-build').innerText = optimized;
    // Save to Firebase if logged in
}

async function fetchXFeed() {
    const response = await fetch('https://api.twitter.com/2/users/by/username/StellaSoraEN/tweets?max_results=10', {
        headers: { 'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAABu15QEAAAAAzzXq9Y2lyiVaPLUORPJS%2Bu%2BNv0Y%3Dmj1vNQN5XDUCNOEZGC8XJB4ibnO0lhfPdQsyZr0uqv006jphvr' }
    });
    const data = await response.json();
    let feedHtml = '';
    data.data.forEach(tweet => {
        // Filter <24h: Check tweet.created_at
        const age = (Date.now() - new Date(tweet.created_at)) / (1000 * 60 * 60);
        if (age < 24) {
            let color = tweet.text.includes('nerf') ? '#FF0000' : (tweet.text.includes('hot-fix') ? '#8B0000' : '#fff');
            feedHtml += `<p style="color: ${color};">${tweet.text}</p>`;
        }
    });
    document.getElementById('x-feed').innerHTML = feedHtml;
}
fetchXFeed();
setInterval(fetchXFeed, 30 * 60 * 1000); // Every 30 mins
