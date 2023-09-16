const configs = {
  'IMG_2291.jpeg': {
    'css': {
      'object-position': 'center -29em',
    }
  },
  'sawanese-20211003_203440.jpeg': {
    'css': {
      'object-position': 'center -14.5em',
    }
  },
  'IMG_2135.png': {
    'css': {
      'object-position': 'center -6em',
    }
  },
  'IMG_2141.png': {
    'css': {
      'object-position': 'center -20em',
    }
  },
};

document.addEventListener('DOMContentLoaded', async function() {
  let count = 0,
      gallery = document.querySelector('#gallery'),
      photos = Object.keys(configs);

  setInterval(function hello() {
    if (count > photos.length-1) count = 0;

    let photo = photos[count];

    for (let cssKey in configs[photo]['css']) {
      gallery['style'][cssKey] = configs[photo]['css'][cssKey];
    }
    // Object.assign(gallery.style, configs[photo]['css']); // This is so slow
    $(gallery).hide().attr('src', `assets/img/${photo}`).fadeIn(400);
    
    ++count;
    return hello;
  }(), 2000);
});
