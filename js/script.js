'user strict';

/* title click handler function */

const titleClickHandler = function() {
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
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

  for (let activeArticle of activeArticles) {
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
};

/* title links generator function */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector (optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList: ', titleList);

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles: ', articles);
  for (let article of articles) {

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

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML: ', linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;

  }
  titleList.innerHTML = html;
  console.log('html: ', html);
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
console.log('links: ', links);

/* tags generator function */

function generateTags() {

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articlesTags: ', articles);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    tagsWrapper.innerHTML = '';
    console.log('tagsWrapper: ', tagsWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log('tag: ', tag);

      /* generate HTML of the link */

      const tagsHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('tagsHTML: ', tagsHTML);

      /* add generated code to html variable */

      html = html + ' ' + tagsHTML;
      console.log('html: ', html);

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;
    console.log('tags html: ', html);

    /* END LOOP: for every article: */
  }
}

generateTags();

const tagsLinks = document.querySelectorAll('.list .list-horizontal');
console.log('tagsLinks: ', tagsLinks);

for (let link of tagsLinks) {
  link.addEventListener('click', titleClickHandler);
}

function tagClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href: ', href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log('tag: ', tag);

  /* find all tag links with class active */

  const allTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('allTags: ', allTags);

  /* START LOOP: for each active tag link */

  for (let activeTag of allTags) {

    /* remove class active */

    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagHref: ', tagHref);

  /* START LOOP: for each found tag link */

  for (let linkTag of tagHref) {

    /* add class active */

    linkTag.classList.add('active');
    console.log('linkTag: ', linkTag);

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log('tagLinks: ', tagLinks);

  /* START LOOP: for each link */

  for (let linkTag of tagLinks) {

    /* add tagClickHandler as event listener for that link */

    linkTag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();
