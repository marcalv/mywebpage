#!/bin/bash
cd "$(dirname "$0")"

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


rm *.html

# reset index from template
cp templates/index_base.html.template index.html




FILES=md/*.md
for f in $FILES
do  
    echo "Processing $f"
    filename=$(basename -- "$f")
    id="${filename%.*}"
    # take action on each file. $f store current file name
    
    # Convert md to html
    markdown $f > $id.md.html

    # a elements open in new tab
    replace "<a" "<a target=\"_blank\"" $id.md.html

    # create HTML entry from base
    # Entry main content
    cp templates/entry_base.html.template $id.html
    replace "-md-" "`cat $id.md.html`" "$id.html"

    # title replace
    title=$(getprop "name" "$f")
    replace "-title-" "$title" "$id.html"

    # icon replace
    icon=$(getprop "icon" "$f")
    replace "-icon-" "$icon" "$id.html"

    # pubdate replace
    pubdate=$(getprop "pubdate" "$f")
    replace "-pubdate-" "$pubdate" "$id.html"

    # moddate replace
    moddate=$(getprop "moddate" "$f")
    replace "-moddate-" "$moddate" "$id.html"

    rm $id.md.html

    # Index
    cp templates/index_entry_base.html.template entry_$id.html

    # title replace
    title=$(getprop "name" "$f")
    replace "-title-" "$title" "entry_$id.html"

    # icon replace
    icon=$(getprop "icon" "$f")
    replace "-icon-" "$icon" "entry_$id.html"

    # id replace
    replace "-id-" "$id" "entry_$id.html"

    # Append entry
    replace "<!--entry-->" "`cat entry_$id.html`" "index.html"

    rm entry_$id.html

done

exit 0