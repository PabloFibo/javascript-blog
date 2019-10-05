'user strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud').innerHTML)
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.authors';

const titleClickHandler = function() {

  event.preventDefault();

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  const clickedElement = this;
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {
      id: articleId,
      title: articleTitle
    };
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    tagsWrapper.innerHTML = '';

    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const tagsHTMLData = {
        id: tag,
        title: tag
      };

      const tagsHTML = templates.tagLink(tagsHTMLData);
      html = html + ' ' + tagsHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector); // .tags
  const tagsParams = calculateTagsParams(allTags);
  let allTagsData = {
    tags: []
  };

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  const tagsLinks = document.querySelectorAll('.list .list-horizontal');

  for (let link of tagsLinks) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTags();

function tagClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const allTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of allTags) {
    activeTag.classList.remove('active');
  }

  const tagLink = document.querySelectorAll('a[href^="' + href + '"]');

  for (let linkTag of tagLink) {
    linkTag.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  for (let linkTag of tagLinks) {
    linkTag.addEventListener('click', tagClickHandler);
  }

}

addClickListenersToTags();

function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
    console.log(author + ' is used ' + authors[author] + ' times');
  }

  return params;
}

function calculateAuthorClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);

  return optCloudClassPrefix + classNumber;
}

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector); // .post

  for (let article of articles) {
    const authorElement = article.querySelector(optArticleAuthorSelector); // .post-author
    let html = '';
    const author = article.getAttribute('data-author');
    const authorHTMLData = {
      id: author,
      title: author
    };
    const linkHTML = templates.authorLink(authorHTMLData);
    html = html + linkHTML;

    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    authorElement.innerHTML = html;

  }

  const authorList = document.querySelector(optAuthorListSelector); // .authors
  const authorsParams = calculateAuthorsParams(allAuthors);

  let allAuthorsData = {
    authors: []
  };

  for (let author in allAuthors) {
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateAuthorClass(allAuthors[author], authorsParams)
    });

  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

}

generateAuthors();

function authorClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const allAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of allAuthors) {
    activeAuthor.classList.remove('active');
  }

  const authorHref = document.querySelectorAll('a[href="' + href + '"]');

  for (let linkAuthor of authorHref) {
    linkAuthor.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {
  const authorsLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let authorLink of authorsLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }

}

addClickListenersToAuthors();
