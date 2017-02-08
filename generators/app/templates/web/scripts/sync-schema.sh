# Pull down metaphysics, run the schema
mkdir externals
git clone https://github.com/artsy/metaphysics externals/metaphysics 
cd externals/metaphysics
yarn install 
yarn run dump-schema -- ../../data

# Let user know what's going on
META_SHA = $(git log -n1 --format='%H')
echo "Metaphysics Schema is now at $($META_SHA)"

# Save a commit
cd ../..
git reset
git add data
git commit -m "Update Metaphysics schema to $($META_SHA)"

rm -rf externals
