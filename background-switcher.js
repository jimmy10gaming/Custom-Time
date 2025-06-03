// Create the input box and add it to the page
const input = document.createElement('input');
input.type = 'text';
input.id = 'image-url-input';
input.placeholder = 'Paste an image link and press Enter';
input.style.position = 'fixed';
input.style.top = '20px';
input.style.left = '50%';
input.style.transform = 'translateX(-50%)';
input.style.width = '400px';
input.style.padding = '10px';
input.style.fontSize = '16px';
input.style.borderRadius = '6px';
input.style.border = '1px solid #ccc';
input.style.outline = 'none';
input.style.zIndex = 1000;
input.style.background = '#fff';
input.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
document.body.appendChild(input);

// Listen for the Enter key
input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const url = e.target.value.trim();
    // Check for common image file extensions
    if (url && /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url)) {
      document.body.style.backgroundImage = `url("${url}")`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
    } else {
      alert('Please enter a valid image URL ending with .jpg, .jpeg, .png, .gif, .webp, .bmp, or .svg');
    }
  }
});
