#!/usr/bin/env ruby
#
require "cgi"

cgi = CGI.new

is_js = cgi.params.has_key?('js')
is_css = cgi.params.has_key?('css')
dev = cgi.params.has_key? "dev"

if is_js and is_css
    cgi.out("type" => "text/plain", "status" => "400") {
        "js and css resources provided - please provide only one"
    }
    exit!
elsif not (is_js or is_css)
    cgi.out("type" => "text/plain", "status" => "200") {
        ""
    }
    exit!
end

prefix = "#{ File.dirname(__FILE__) }/../"
files = (is_js ? cgi.params["js"] : cgi.params['css'])

existing_files = files.map { |path| File.absolute_path(prefix + path.gsub(/\.\./, '')) }.
                       select { |filename| File.exists? filename }

puts cgi.header({
    "type" => (is_js ? "text/javascript" : "text/css"),
    "charset" => "utf8",
    "status" => 200,
    "connection" => "close",
    "expires" => Time.now + (dev ? 30 : (60*60*24*365))
})

existing_files.map do |filename|
    # print lines, stripping mappings (which will be wrong).
    File.open(filename, "r:UTF-8").each do |line|
        puts line unless (line =~ /\/\/. sourceMappingURL=/) 
    end
    puts ""
end

