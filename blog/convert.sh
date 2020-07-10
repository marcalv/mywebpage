#!/bin/bash

# Set working dir
cd "$(dirname "$0")"

# FUNCTIONS
# =====================

# Replace string $1 with string $2 in file $3
replace () {
        toreplace=$(sed -e 's/[&\\/]/\\&/g; s/$/\\/' -e '$s/\\$//' <<<"$1")   # Keyscape for sed
        with=$(sed -e 's/[&\\/]/\\&/g; s/$/\\/' -e '$s/\\$//' <<<"$2")        # Keyscape for sed
        sed -i -e 's/'"${toreplace}"'/'"${with}"'/' $3                        # Actual replace
} 

# Get $1 prop from $2 file
getprop (){
    regex="<!--$1:([A-Za-z0-9 \/\?¿]*)-->"
    [[ `cat $2` =~ $regex ]]
    echo ${BASH_REMATCH[1]}
}



# START
# =====================
# Cleanup previous html files
rm *.html                                                  

# Create new empty blog index
cp templates/index_base.html index.html             



# Loop .md files
FILES=md/*.md                                                   
for f in $FILES                                             
do  
    echo "Processing $f"

    # Get .md filename with extension
    filename=$(basename -- "$f")                            

    # Get .md filename without numeration and extension
    regex="[0-9]*([a-z]*)"
    [[ `echo $filename` =~ $regex ]]
    id=$(echo ${BASH_REMATCH[1]})                           
    

    # Convert md to html
    markdown $f > $id.md.html

    # a elements open in new tab
    replace "<a" "<a target=\"_blank\"" $id.md.html

    # Create new entry from base
    cp templates/entry_base.html $id.html

    # Insert content
    replace "-md-" "`cat $id.md.html`" "$id.html"

    # Insert title
    title=$(getprop "name" "$f")
    replace "-title-" "$title" "$id.html"

    # Insert icon
    icon=$(getprop "icon" "$f")
    replace "-icon-" "$icon" "$id.html"

    # Insert publication date
    pubdate=$(getprop "pubdate" "$f")
    replace "-pubdate-" "$pubdate" "$id.html"

    # Insert last modification date
    moddate=$(getprop "moddate" "$f")
    replace "-moddate-" "$moddate" "$id.html"

    # Cleanup converted md to html
    rm $id.md.html


    # Create new item list for index blog page
    cp templates/index_entry_base.html entry_$id.html

    # Insert title
    title=$(getprop "name" "$f")
    replace "-title-" "$title" "entry_$id.html"

    # Insert icon
    icon=$(getprop "icon" "$f")
    replace "-icon-" "$icon" "entry_$id.html"

    # Insert id (for url)
    replace "-id-" "$id" "entry_$id.html"

    # Append entry to index
    replace "<!--entry-->" "`cat entry_$id.html`" "index.html"

    # Cleanup list item html file
    rm entry_$id.html

done

echo 'Done'
exit 0