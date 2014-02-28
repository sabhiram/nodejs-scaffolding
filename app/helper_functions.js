/*****************************************************************************\
    Helper Functions
\*****************************************************************************/

module.exports = {
    /*****************************************************************************\
    Function:
        append_all

    Description:
        Function to concat a random group of lists so we can arbitarily 
        target files for grunt tasks etc
    \*****************************************************************************/
    append_all: function() {
        if(arguments.length > 0) {
            // "apply" the concat function to '[]' (param1) and pass
            // in the array of args to the concat function.
            return [].concat.apply([], arguments);
        }
        return [];
    },
};
