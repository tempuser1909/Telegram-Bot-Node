/*
    DESCRIPTION: 
        PluginHelper
        This special plugin will manage help command, enable/disable plugin requests and much more that the average plugin-writer should not be concerned of.

    AUTHOR: 
        Cristian Baldi

    COMMANDS:
        !help
        !list
        !enable        
        !disable

    EXAMPLE:
        TODO
*/

var util = require('./util');

var PluginHelper = function(){

    this.plugins = {};

    this.on("init", function (callback){
        console.log("Initting PluginHelper");
        callback();
    });

    this.on("stop", function (callback){
        console.log("Stopping PluginHelper");
        callback();
    });

    this.on("text", function (msg, reply){

        var matchHelp = util.parseCommand(msg.text,["help"]);
        var matchList = util.parseCommand(msg.text,["list"]);

        if(matchHelp)
        {
            plugin = matchHelp[1];
            if(this.plugins[plugin])
            {   
                help = this.plugins[plugin];
                message = "*" + help.name + "*\n" + "" + help.shortDescription + "\n\n" + help.fullHelp
                reply({type:"text", text: message, options:{parse_mode: "Markdown"} })
            }
        } else if (matchList){
            var message = "*Enabled Plugins*\n\n"

            var names = Object.keys(this.plugins);

            for(var i in names)
            {
                message+="• " + names[i] + "\n";
            }

            message+="\nUse `!help commandName` to get help about a specific plugin.";
            reply({type:"text", text: message, options:{parse_mode: "Markdown"} })
        }
    });


    this.addPlugin = function(plugin){
        this.plugins[plugin.help.name] = plugin.help;
    };
};

module.exports = PluginHelper;