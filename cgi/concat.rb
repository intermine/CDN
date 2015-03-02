#!/usr/bin/env ruby
#
require "cgi"

cgi = CGI.new

js = cgi.params["js"]
dev = cgi.params.has_key? "dev"

prefix = "#{ File.dirname(__FILE__) }/../js/"

js_files = js.map { |path| File.absolute_path(prefix + path.gsub(/\.\./, '')) }
existing_files = js_files.select { |filename| File.exists? filename }

puts cgi.header({
    "type" => "text/javascript",
    "charset" => "utf8",
    "status" => 200,
    "connection" => "close",
    "expires" => Time.now + (dev ? 30 : (60*60*24*365))
})

existing_files.map do |filename|
    f = File.new(filename, "r")
    puts f.read()
end

