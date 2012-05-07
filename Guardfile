guard 'coffeescript', :all_on_start => true, :input => 'src', :output => 'lib', :bare => true
guard 'coffeescript', :all_on_start => true, :input => 'spec', :output => 'spec', :bare => true

# Run Docco 
guard 'process', :name => 'Docco', :command => 'docco src/holdr.coffee' do
 watch %r{src/.+\.coffee}
end

# Copy the newly created lib file for minification.
guard 'process', :name => 'Copy to min', :command => 'cp lib/holdr.js lib/holdr.min.js' do
 watch %r{lib/holdr.js}
end

# Use uglify.js to minify the Javascript for maximum smallness
guard 'uglify', :destination_file => "lib/holdr.min.js" do
 watch (%r{lib/holdr.min.js})
end
