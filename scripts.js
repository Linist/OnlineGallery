// Sticky Navbar
window.onload = function() {
    var navbar = document.getElementById("navbar");
    if (navbar) {
        window.onscroll = debounce(function() {
            var sticky = navbar.offsetTop;

            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        }, 20); // Debounce with a 20ms delay
    } else {
        console.error('Navbar element not found.');
    }
};

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Flickr API credentials
const apiKey = 'd063838afe1e2053a6aa34c6d3c336e7'; // Your new Flickr API key
const userId = '201430598@N08'; // Your Flickr User ID (remains unchanged)

// Function to fetch and display Flickr photos
function fetchFlickrPhotos() {
    const flickrAPI = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

    // Fetch data from Flickr API
    $.getJSON(flickrAPI, function (data) {
        // Log the API response to inspect the data structure
        console.log("Flickr API Response: ", data);

        // Check if data and photos are available
        if (data && data.photos && data.photos.photo) {
            let photoHTML = '';
            const photos = data.photos.photo; // Retrieve photos array

            // Loop through each photo and generate HTML
            $.each(photos, function (i, photo) {
                const photoURL = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                photoHTML += `<div><img src="${photoURL}" alt="${photo.title}"></div>`;
            });

            // Inject the photos into the gallery container
            $('.flickr-gallery').html(photoHTML);
        } else {
            console.error('No photos found or incorrect data structure from Flickr API.');
        }
    }).fail(function() {
        console.error('Error fetching photos from Flickr.');
    });
}

/* remove the link from the flickr images*/ 
    // Select all links inside the flickr-album class
    document.querySelectorAll('.flickr-album a').forEach(link => {
        // Add a click event listener
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior (navigation)
        });
    });


// Call the function when the document is ready
$(document).ready(function () {
    fetchFlickrPhotos();
});


// Navigation Menu (Optional Functions)
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}


function validateForm() {
    let valid = true;

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('name-error').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
    if (email === '' || !emailRegex.test(email)) {
        document.getElementById('email-error').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('email-error').style.display = 'none';
    }

    // Message validation
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        document.getElementById('message-error').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('message-error').style.display = 'none';
    }

    return valid; // Return false if the form is invalid to prevent submission
}

    // Function to highlight the current link
    function highlightCurrentLink() {
        const sections = document.querySelectorAll("section"); // Assuming your sections have IDs like #home, #about, etc.
        const navLinks = document.querySelectorAll(".desktop-nav li a");

        // Get the scroll position of the page
        let scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // Offset for better accuracy
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove 'active' class from all links
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                // Add 'active' class to the current section link
                document.querySelector(`.desktop-nav li a[href*="${sectionId}"]`).classList.add("active");
            }
        });
    }

    // Event listeners for scroll and load to update the active link
    window.addEventListener("scroll", highlightCurrentLink);
    window.addEventListener("load", highlightCurrentLink);
