require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

desc 'Default: run unit tests.'
task :default => :test

desc 'Test the tiny_mce plugin.'
Rake::TestTask.new(:test) do |t|
  t.libs << 'lib'
  t.pattern = 'test/**/*_test.rb'
  t.verbose = true
end

desc "Package TinyMCE Javascript Files -> converts _src.js to compressed .js files"
task :compress do
  search_path = File.expand_path("lib/tiny_mce/assets/tiny_mce/", File.dirname(__FILE__)) + "/**/**_src.js"
  puts search_path.inspect
  Dir[search_path].each do|js|
    output = js.gsub(/_src/,'')
    closure_cmd = "java -jar " + File.expand_path("lib/compiler.jar", File.dirname(__FILE__)) + " --js=#{js} --js_output_file=#{output}"
    cmd = closure_cmd
    puts cmd.inspect
    if !system(cmd)
      puts "Trying jsmin..."
      jsmin_cmd = "ruby " + File.expand_path("lib/jsmin.rb", File.dirname(__FILE__)) + " < #{js} > #{output}"
      cmd = jsmin_cmd
      puts cmd.inspect
      raise "error compressing file: #{js} to #{output}" if !system(cmd)
    end
  end
end