<!--name:Blog automation: write Markdown, get HTML-->
<!--pubdate:2020/07/13-->
<!--moddate:2020/07/13-->
<!--icon:book-->

## Writing in HTML isn't that cool

I have written my whole web in HTML line by line, or in other words, I hace not used any framework. Writing a blog like this in this language is not very convenient. That is why I have created a little [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) script that converts Markdown files (one per blog entry) to HTML and integrates them on the web automagically.

For those who don't know what markdown is, it's a language for writing documents with format (different level headers, bold, italic, tables, graphs...) in a very simple way. Any simple plain text processor is enough to begin writing a Markdown file. 

#### Markdown demonstration
**Below** you can see how this paragraph is written in Markdown format. [Here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) you have more information on what you can do with it.

```
#### Markdown demonstration
**Below** you can see how this paragraph is written in Markdown format. [Here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) you have more information on what you can do with it.
```

## How the automation works

The script must be executed every time an HTML template has been modified, or a new Markdown file (new entry) is created. Currently the script is placed at `blog/convert.sh`, HTML templates in `blog/templates` and `.md` (Markdown) files in `blog/md`. When the script is executed, the following files are generated:

* `blog/index.html`:  blog index page, containing a link to every entry. 
* `blog/entry_id.html`: entry page containing an HTML version of the file `blog/md/entry_id.html`. This occurs for every `.md` file inside `blog/md` folder.

As you may have noticed, every blog entry has associated an icon that is shown at the index and in the entry itself. This information as well as date of publication and modification and title of the entry are declared at the beginning of the `.md` file following this structure:

```
<!--name:Sobre esta web-->
<!--pubdate:09/07/2020-->
<!--moddate:10/07/2020-->
<!--icon:web-->
```

With this functionality, I do not have to deal with any HTML code at all in order to post a new entry. Everything is done in the `.md` file.

## Source code
Just like my whole website, you can find the source code of this [script](https://github.com/marcalv/mywebpage/blob/master/blog/convert.sh) and the folder containing all my [blog entries](https://github.com/marcalv/mywebpage/tree/master/blog/md) in `.md` format in my  [Github repository](Github repository).