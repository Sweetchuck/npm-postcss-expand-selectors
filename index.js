
const plugin = () => {
    return {
        postcssPlugin: 'postcss-expand-selectors',
        Once(root) {
            function getDebugComment(rule) {
                const debugCommentRegexp = /^line \d+, .+$/;
                const comment = rule.prev();

                return comment &&
                comment.type === 'comment' &&
                debugCommentRegexp.test(comment.text) ? comment : null;
            }

            function duplicateRule(rule, newSelector, debugComment) {
                const prefix = rule.prev() ? '' : '\n';
                const ruleClone = rule.cloneAfter({
                    selectors: [prefix + newSelector]
                });

                if (debugComment) {
                    ruleClone
                        .parent
                        .insertBefore(ruleClone, debugComment.clone());
                }
            }

            root.walkRules(rule => {
                if (rule.selectors.length < 2) {
                    return;
                }

                const selectors = rule.selectors;
                rule.selectors = [selectors.shift()];

                const debugComment = getDebugComment(rule);
                for (const selectorIndex in selectors.reverse()) {
                    if (Object.prototype.hasOwnProperty.call(selectors, selectorIndex)) {
                        duplicateRule(rule, selectors[selectorIndex], debugComment);
                    }
                }
            });
        },
    };
};

plugin.postcss = true;

module.exports = plugin;
