# Pull down elan, copy the json file
mkdir externals
git clone https://github.com/artsy/elan externals/elan

cp externals/elan/components/lib/variables/colors.json data

# Let user know what's going on
cd externals/elan
META_SHA = $(git log -n1 --format='%H')
echo "Elan color JSON is now at $($META_SHA)"

# Save a commit
cd ../..
git reset
git add data/colors.json
git commit -m "Update Elan color JSON to $($META_SHA)"

rm -rf externals
