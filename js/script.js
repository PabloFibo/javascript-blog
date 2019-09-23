'user strict';

/* title click handler function */

const titleClickHandler = function(){
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  event.preventDefault();
  const clickedElement = this;
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector: ', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle: ', targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
    console.log('active: ', targetArticle);
}

/* title links generator function */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log('titleList: ', titleList);

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');
      console.log('articleId: ', articleId);

    /* find the title element */

    const titleElement = article.querySelector('.post-title');
      console.log('titleElement ', titleElement);

    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle ', articleTitle);

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' +  articleTitle + '</span></a></li>';
      console.log('linkHTML: ', linkHTML);

    /* insert link into titleList */

      html = html + linkHTML;

    }
  titleList.innerHTML = html;
    console.log('html: ', html);
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
  console.log('links: ', links);
