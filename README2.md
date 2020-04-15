# WP thoughts - tried to follow a structure - didn't quite work out.

## My knowledge of how/why it is used in general.
- Nowadays WP is used for creating all types of websites. First, Why? Because it is easy to get started with. What's the problem. The web isn't that simple and generates a lot of problems. Can an average person create WP site - Yes. Is this good? Depends for who. For me it's really bad. Why? Because of plugins. Since there is plugin for everything it quickly becomes bloated. 

## My learning experience.
- In 2019 I was told to create a theme. 
- What is theme and why is it called that???????????????????????
- Because wp is a blogging system and you create posts. You have a single page for a post, list of all the posts, posts by category and so on. You want to write all the css and page structure once and query for posts. 
- How do almost all of wp pages look - A query for list of posts of some type, which are ordered/filtered/limited to a certain number (to db)
- I didn't know what a theme was. I kinda do now. I Didn't know where to look or where to start. The tutorials were made by indians and were mainly targeted for people with limited coding skills. There is a theme market and its pretty big. That was the beginning of 2019. The thing is that I was several years late. When I had to start learning wordpress, no one was starting with me. There were no good resources available. In 2019 people were learning frameworks and so on. So why bother? Because WP websites are cheaper, easier to maintain and their dreadful code (in most cases) remains useful and working years late. It's that simple.
- The thing is that, as I said before, I couldn't find good WP code examples. Everything I was until then was simply bad and bloated code. 
- [Template hierarchy](https://developer.wordpress.org/files/2014/10/Screenshot-2019-01-23-00.20.04.png)
- How do I start. Where do i write my code? You basically start with three files
* `functions.php` that you learn is for modifying functionality
* `style.css` - there for some reason you define your theme name and stuff
* `index.php` - which is the default file for each route in the wesbite.

- In the image you can see that there are template files that you have to create on your own which correspond to post_type or taxonomy. You just need to find out which template you need to use for each page url. If you don't it checks if the next file exists, if it doesn't it automatically goes to `index.php`
- For pages - which are `post_type=page` you can create `/* Page Template: Name123 */`, which you can pick on each page. 
- Anyway, this is endless..., because then you have Guttenberg, which is WP ver 5+ that used Blocks that are similar to React components, but as I said it has no end.

## How would I recommend someone new to start learning WP
- nobody actually starts to learn wp now, so it doesn't matter.

## What do you need for wp
*Two Things*
Server + MySQL - XAMPP or equivalent
code - local, ftp, github
There is a config.php file where it access the db and that's basically it

*Directory Structure*
`wp-admin & wp-includes` are overwritten by every new wordpress release.
You work in `wp-content`. There are 3 folders
`uploads` - images, pdf, etc. You can add them in two ways - in wordpress with drag and drop or with the file system.
[example](http://chromeye.com/wp-content/uploads/2018/01/carousel_se.jpg)

`plugins` - they looks scarier than they actually are, you need a 
- directory and `index.php`, 
- define some properties like name and author
- create a function where you write your html/php code
  
`themes` - list of themes. WP has default ones, you can look at them.

## How does a wordpress database structure look?
- `wp_links` - There are a lot of questions why this table still exists. It's actually pretty good example that stuff simply doesn't get removed in wp
- `wp_options` - site name, site description, insert n configurations...
- `wp_posts`- everything 
- `wp_terms` - aka category
- `wp_termmeta` - stuff about the category
- `wp_term_relationships` - in SQL there are tables that link other tables together
- `wp_term_taxonomy` - A taxonomy within WordPress is a way of grouping posts together based on a select number of relationships. By default, a standard post will have two taxonomy types called Categories and Tags.
- `wp_users` - obvious
- `wp_usermeta` - information about every user like role, color, editor preferences
- `wp_comments` - no need to explain these two
- `wp_commentmeta` -



## Simple example for problems generated by plugins
Plugins don't know about each other, but still use common actions or filters. What are these? They are called Hooks
[Hooks](https://developer.wordpress.org/plugins/hooks/)
The main difference between an action and a filter can be summed up like this:

- Documentation - an action takes the info it receives, does something with it, and returns nothing. In other words: it acts on something and then exits, returning nothing back to the calling hook. A filter takes the info it receives, modifies it somehow, and returns it. In other words: it filters something and passes it back to the hook for further use. Said another way: an action interrupts the code flow to do something, and then returns back to the normal flow without modifying anything; a filter is used to modify something in a specific way so that the modification is then used by code later on.

Ok, dunno what the reader can understand, but I want practical examples. I want to create a wordpress plugin, where when I click a button I list all races for Cheltenham. How do I do that, I read about plugin structure and create a form with a button. On click I want to list all of the races. How do I capture the _click_ event. With an action. By clicking a button you submit a form with POST request. In the _body_, you define an _action_ and post _parameters_. Then somewhere in your plugin or in functions.php you create this monster: 

```php
function getAPIStuff() {
  $ourData = $_POST['raceID'];
  $ourOtherData = $_POST['otherthing'];

  $resp = functionThatFetchesData($ourData, $ourOtherData);
  
  echo json_encode($resp["data"]);
  die();
}
add_action('wp_ajax_getAPIStuff', 'getAPIStuff');
add_action('wp_ajax_nopriv_getAPIStuff', 'getAPIStuff');
```

This is used both for plugins and for front-end code. What's does it do. It starts a new WP instance, you have access to all WP functionality, you can fetch and create new posts.

It's impossible to actually learn all the actions or filters, because they are simply too many and they are sorted A-Z. For someone who has used good documentation, like that of Angular and Vue -> this is absurd.

- Wordpress is a popular and is a CMS. Ok. How do I learn more about it? Actually as a developer I care about its documentation, not so much about how it presents itself infront of the client. 
- Key point: Wordpress components use a mix of object orientated programming and procedural programming, but on the whole the software is not built from the ground up according to OO principles. It's also never had the "big rewrite". Why do I care about that? It simply uses old code, so it's backwards compatible. 
- How do I compare my wordpress developer experience with wordpress to that with Vue. The documentation is ok, just the website itself feels dated and the search functionality is simply old. The information I receive is sufficient
- Where do you learn WP from? 

# Customizing it example.
Posting that again for reference
[Template hierarchy](https://developer.wordpress.org/files/2014/10/Screenshot-2019-01-23-00.20.04.png)
We had to modify its permalink structure. I'm not going to detail it. What I am going to say is that wp has rules of how the permalinks have to be structured. Of course you can modify that, but at what cost. First, find a way, ok, it's not that hard, because there is a lot of information about WP someone has already encountered that problem. After that - where exactly do you write that code? It has a configuration file called `functions.php` where you have to write everything that customizes it. You have to actually check if the hook that you are using clashes with other person/plugin hook. Ok, you have done it. You copied some code that overwrited it, you did it. Yes, but what exactly did you do? Here is the part I want to emphasize on. The thing is that *nobody actually knows what you did that*. This is actually one the most frustrating things. You read how it works, it's permalink structure, but after that you see a website that doesn't work in that way. You start to wonder why. Then, you start looking at the code, you have to read a big chunk of it until you find the function that overwrites the default behaviour of WP. And then you become frustrated again. You fully realize that the modification could be somehow made clearer? But where? How does one inform the next person working on that website that he modified core functionality? 
This is an example why Wordpress has gone too far. The people want to use it for more than it should be - it works, but, again, at what cost.

# Good thing about acquiring WP knowledge
- it will always stay relevant, doesn't matter if the website is built on old version or not, because the principles remain the same. Example: 
- Vue.js is migrating to version 3.0 which completely changes its API - becomes more similar to React. 
- React on the other hand introduced hooks last year allowing us to ditch class based syntax (almost completely), but left few issues that we are waiting to be resolved - like fetching data - React Suspense will be used for that, but it's still not released.

# More examples of things we could do in WP that we didn't have the knowledge/time at that moment - some easier than others.
- Generating and keeping data in wp itself
We used AWS for creating a JSON where we generate all the data and use it in our pages. Can this be done in WP - yes. We can use wp-cron scheduling, which runs on every page load and checks the list of functions that are scheduled to be done. We can then write that information in custom fields for every race. 
- We had a request for a "live blog"
We can have a `setInterval` function that calls an *action*, defined in `functions.php` that makes a query and gives us the latest posts.
- Have an options page where we define global stuff like colors
- Have global styles for common components, like buttons, dropdowns
- Create our own plugin for bulk creating/updating posts - I had to manually edit every post multiple times

## Would I be willing to continue working on wp 
Depends.
There are two types of people. 
Some like to get it done quickly - the majority of people.
Others like me *try* to write maintainable and readable code.
- My advice would be having 2 stages: 
_Stage1_ - rapid prototyping - deliver the wanted product as quickly as possible. _Stage2_ - talk about that code, try to refactor it, document it, see if it is already used somewhere else. Talk about how it would scale.

# Gatsby stuff

### Probably the main question about Gatsby is are we going to be able to do the same that we did in WP
On theory yes. Still, I think that question is inherently wrong. We couldn't accomplish a lot of stuff in WP also. 
I care about developer experience, so I'm going to write about that.
*In gatsby we define our site structure. In WP there is a predefined structure and we fight against it.* 





### Why bother writing all of that - there is actually no need to. Because a person learns the most about a thing when he tries to explain it to others.

























