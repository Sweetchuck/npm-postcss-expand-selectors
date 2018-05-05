
const postCss = require('postcss');

module.exports = postCss.plugin('postcss-expand-selectors', function () {
    return function (root) {
        const getDebugComment = function (rule) {
            const debugCommentRegexp = /^line \d+, .+$/;
            const comment = rule.prev();

            return comment &&
                comment.type === 'comment' &&
                debugCommentRegexp.test(comment.text) ?
                comment :
                null;
        };

        const duplicateRule = function (rule, newSelector, debugComment) {
            const prefix = rule.prev() ? '' : '\n';
            const ruleClone = rule.cloneAfter({
                selectors: [prefix + newSelector]
            });

            if (debugComment) {
                ruleClone
                    .parent
                    .insertBefore(ruleClone, debugComment.clone());
            }
        };

        root.walkRules(function (rule) {
            if (rule.selectors.length < 2) {
                return;
            }

            const selectors = rule.selectors;
            rule.selectors = [selectors.shift()];

            const debugComment = getDebugComment(rule);
            for (let selectorIndex in selectors.reverse()) {
                if (selectors.hasOwnProperty(selectorIndex)) {
                    duplicateRule(rule, selectors[selectorIndex], debugComment);
                }
            }
        });
    };
});
