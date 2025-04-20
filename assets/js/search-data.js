// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A selection of projects I did in my free time.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "Check out my repos on GitHub. I usually publish the source code for my projects there.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "This page is under construction. But you can still download my resume using the button on the right.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-finally-found-the-time-to-create-a-blog-i-had-this-on-my-to-do-list-for-a-while-but-now-i-have-the-right-occasion-to-do-so-in-the-next-days-i-will-create-some-posts-describing-how-i-created-my-vietnamese-anki-decks",
          title: 'Finally found the time to create a blog! I had this on my...',
          description: "",
          section: "News",},{id: "projects-tools-for-vietnamese-language-learning",
          title: 'Tools for Vietnamese Language Learning',
          description: "Posts describing tools for Vietnamese language learning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vietnamese-language-tools/";
            },},{id: "projects-diy",
          title: 'DIY',
          description: "Posts for various DIY Projects",
          section: "Projects",handler: () => {
              window.location.href = "/projects/diy/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
