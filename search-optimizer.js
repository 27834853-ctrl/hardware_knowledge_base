/**
 * Search Optimizer
 * Hardware Engineer Knowledge Base
 * Provides optimized search with indexing and caching
 */

(function() {
    'use strict';

    /**
     * Search optimizer configuration
     */
    const config = {
        cacheEnabled: true,
        cacheExpiry: 3600000, // 1 hour in milliseconds
        minQueryLength: 2,
        maxResults: 50,
        indexedFields: ['title', 'content', 'tags', 'category'],
        highlightEnabled: true,
        fuzzySearchEnabled: true,
        fuzzyThreshold: 0.6 // 0-1, lower = more strict
    };

    /**
     * Search index structure
     */
    let searchIndex = {
        documents: [],
        index: new Map(),
        lastUpdated: null,
        version: '1.0'
    };

    /**
     * Cache for search results
     */
    let searchCache = new Map();

    /**
     * Build search index from page content
     */
    function buildSearchIndex() {
        const startTime = performance.now();
        const documents = [];
        let docId = 0;

        // Index formulas
        document.querySelectorAll('.formula-card').forEach(card => {
            const title = card.querySelector('h4')?.textContent.trim() || '';
            const content = card.textContent.trim();
            const category = card.closest('.category-section')?.querySelector('h3')?.textContent.trim() || '';
            const tags = extractTags(content);

            documents.push({
                id: docId++,
                type: 'formula',
                title,
                content,
                category,
                tags,
                element: card,
                searchText: [title, content, category, ...tags].join(' ').toLowerCase()
            });
        });

        // Index cases
        document.querySelectorAll('.case-card').forEach(card => {
            const title = card.querySelector('h4')?.textContent.trim() || '';
            const content = card.textContent.trim();
            const category = card.closest('.case-category')?.querySelector('h4')?.textContent.trim() || '';
            const tags = extractTags(content);

            documents.push({
                id: docId++,
                type: 'case',
                title,
                content,
                category,
                tags,
                element: card,
                searchText: [title, content, category, ...tags].join(' ').toLowerCase()
            });
        });

        // Index sections
        document.querySelectorAll('.category-section, .info-card').forEach(section => {
            const title = section.querySelector('h3, h4, h5')?.textContent.trim() || '';
            const content = section.textContent.trim();
            const tags = extractTags(content);

            if (title) {
                documents.push({
                    id: docId++,
                    type: 'section',
                    title,
                    content,
                    category: '',
                    tags,
                    element: section,
                    searchText: [title, content, ...tags].join(' ').toLowerCase()
                });
            }
        });

        // Build inverted index
        const index = new Map();
        documents.forEach(doc => {
            const words = tokenize(doc.searchText);
            words.forEach(word => {
                if (!index.has(word)) {
                    index.set(word, new Set());
                }
                index.get(word).add(doc.id);
            });
        });

        searchIndex = {
            documents,
            index,
            lastUpdated: Date.now(),
            version: '1.0'
        };

        // Cache index to localStorage
        if (config.cacheEnabled) {
            try {
                localStorage.setItem('search-index', JSON.stringify({
                    documents: documents.map(d => ({
                        id: d.id,
                        type: d.type,
                        title: d.title,
                        content: d.content.substring(0, 500), // Limit content size
                        category: d.category,
                        tags: d.tags,
                        searchText: d.searchText
                    })),
                    lastUpdated: searchIndex.lastUpdated,
                    version: searchIndex.version
                }));
                console.log('✅ Search index cached to localStorage');
            } catch (error) {
                console.warn('⚠️  Failed to cache search index:', error);
            }
        }

        const endTime = performance.now();
        console.log(`📊 Search index built: ${documents.length} documents in ${(endTime - startTime).toFixed(2)}ms`);
    }

    /**
     * Load search index from cache
     */
    function loadCachedIndex() {
        if (!config.cacheEnabled) {
            return false;
        }

        try {
            const cached = localStorage.getItem('search-index');
            if (!cached) {
                return false;
            }

            const cachedData = JSON.parse(cached);
            const age = Date.now() - cachedData.lastUpdated;

            if (age > config.cacheExpiry) {
                console.log('⏰ Cached search index expired');
                localStorage.removeItem('search-index');
                return false;
            }

            // Restore index structure
            const index = new Map();
            cachedData.documents.forEach(doc => {
                const words = tokenize(doc.searchText);
                words.forEach(word => {
                    if (!index.has(word)) {
                        index.set(word, new Set());
                    }
                    index.get(word).add(doc.id);
                });
            });

            searchIndex = {
                documents: cachedData.documents,
                index,
                lastUpdated: cachedData.lastUpdated,
                version: cachedData.version
            };

            console.log(`✅ Search index loaded from cache (${cachedData.documents.length} documents)`);
            return true;
        } catch (error) {
            console.warn('⚠️  Failed to load cached index:', error);
            localStorage.removeItem('search-index');
            return false;
        }
    }

    /**
     * Extract tags from content
     */
    function extractTags(content) {
        const tags = [];

        // Common hardware terms
        const terms = [
            'PCB', 'DDR', 'LPDDR', 'USB', 'HDMI', 'I2C', 'SPI', 'UART',
            'EMI', 'EMC', 'ESD', 'RF', 'ADC', 'DAC', 'PWM', 'GPIO',
            '电源', '信号', '阻抗', '电容', '电阻', '电感', '二极管', '三极管',
            '放大器', '滤波', '时钟', '复位', '中断', '总线'
        ];

        terms.forEach(term => {
            if (content.includes(term)) {
                tags.push(term);
            }
        });

        return tags;
    }

    /**
     * Tokenize text into words
     */
    function tokenize(text) {
        // Split by whitespace and special characters, keep alphanumeric
        return text
            .toLowerCase()
            .split(/[\s\-_.,;:!?()[\]{}'"]+/)
            .filter(word => word.length >= 2)
            .filter(word => !isStopWord(word));
    }

    /**
     * Check if word is a stop word
     */
    function isStopWord(word) {
        const stopWords = new Set([
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
            '的', '了', '和', '在', '是', '有', '与', '为', '以', '可', '等'
        ]);
        return stopWords.has(word);
    }

    /**
     * Optimized search function
     */
    function optimizedSearch(query) {
        if (!query || query.length < config.minQueryLength) {
            return [];
        }

        const cacheKey = query.toLowerCase().trim();

        // Check cache
        if (config.cacheEnabled && searchCache.has(cacheKey)) {
            const cached = searchCache.get(cacheKey);
            if (Date.now() - cached.timestamp < config.cacheExpiry) {
                console.log('📦 Using cached search results');
                return cached.results;
            }
        }

        const startTime = performance.now();

        // Tokenize query
        const queryWords = tokenize(query);
        if (queryWords.length === 0) {
            return [];
        }

        // Find matching documents using inverted index
        const docScores = new Map();

        queryWords.forEach((word, wordIndex) => {
            // Exact match
            if (searchIndex.index.has(word)) {
                searchIndex.index.get(word).forEach(docId => {
                    const currentScore = docScores.get(docId) || 0;
                    docScores.set(docId, currentScore + 10); // Exact match bonus
                });
            }

            // Fuzzy match (if enabled)
            if (config.fuzzySearchEnabled) {
                searchIndex.index.forEach((docSet, indexedWord) => {
                    if (indexedWord !== word) {
                        const similarity = stringSimilarity(word, indexedWord);
                        if (similarity >= config.fuzzyThreshold) {
                            docSet.forEach(docId => {
                                const currentScore = docScores.get(docId) || 0;
                                docScores.set(docId, currentScore + (similarity * 5)); // Fuzzy match score
                            });
                        }
                    }
                });
            }
        });

        // Rank and filter results
        const results = Array.from(docScores.entries())
            .map(([docId, score]) => {
                const doc = searchIndex.documents[docId];
                return {
                    ...doc,
                    score,
                    relevance: calculateRelevance(doc, queryWords)
                };
            })
            .sort((a, b) => {
                // Sort by score first, then by relevance
                if (Math.abs(a.score - b.score) > 0.1) {
                    return b.score - a.score;
                }
                return b.relevance - a.relevance;
            })
            .slice(0, config.maxResults);

        const endTime = performance.now();
        console.log(`🔍 Search completed: ${results.length} results in ${(endTime - startTime).toFixed(2)}ms`);

        // Cache results
        if (config.cacheEnabled) {
            searchCache.set(cacheKey, {
                results,
                timestamp: Date.now()
            });
        }

        return results;
    }

    /**
     * Calculate string similarity (Levenshtein distance based)
     */
    function stringSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;

        if (longer.length === 0) {
            return 1.0;
        }

        const editDistance = levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    /**
     * Calculate Levenshtein distance
     */
    function levenshteinDistance(str1, str2) {
        const matrix = [];

        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[str2.length][str1.length];
    }

    /**
     * Calculate relevance score
     */
    function calculateRelevance(doc, queryWords) {
        let score = 0;

        // Title match bonus
        queryWords.forEach(word => {
            if (doc.title.toLowerCase().includes(word)) {
                score += 5;
            }
        });

        // Category match bonus
        queryWords.forEach(word => {
            if (doc.category.toLowerCase().includes(word)) {
                score += 3;
            }
        });

        // Tag match bonus
        queryWords.forEach(word => {
            doc.tags.forEach(tag => {
                if (tag.toLowerCase().includes(word)) {
                    score += 2;
                }
            });
        });

        // Content match
        queryWords.forEach(word => {
            const regex = new RegExp(word, 'gi');
            const matches = (doc.content.match(regex) || []).length;
            score += matches * 0.5;
        });

        return score;
    }

    /**
     * Highlight search terms
     */
    function highlightTerms(text, queryWords, maxLength = 200) {
        if (!config.highlightEnabled) {
            return text.substring(0, maxLength);
        }

        let highlighted = text;

        // Find first occurrence of any query word
        let firstIndex = -1;
        queryWords.forEach(word => {
            const index = text.toLowerCase().indexOf(word);
            if (index !== -1 && (firstIndex === -1 || index < firstIndex)) {
                firstIndex = index;
            }
        });

        // Extract relevant snippet
        if (firstIndex !== -1) {
            const start = Math.max(0, firstIndex - 50);
            const end = Math.min(text.length, firstIndex + maxLength);
            highlighted = (start > 0 ? '...' : '') + text.substring(start, end) + (end < text.length ? '...' : '');
        } else {
            highlighted = text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
        }

        // Highlight query words
        queryWords.forEach(word => {
            const regex = new RegExp(`(${escapeRegExp(word)})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark>$1</mark>');
        });

        return highlighted;
    }

    /**
     * Escape special regex characters
     */
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Clear search cache
     */
    function clearSearchCache() {
        searchCache.clear();
        localStorage.removeItem('search-index');
        console.log('🗑️  Search cache cleared');
    }

    /**
     * Rebuild index
     */
    function rebuildIndex() {
        clearSearchCache();
        buildSearchIndex();
        console.log('🔄 Search index rebuilt');
    }

    /**
     * Public API
     */
    window.SearchOptimizer = {
        search: optimizedSearch,
        highlight: highlightTerms,
        rebuild: rebuildIndex,
        clear: clearSearchCache,
        getStats: () => ({
            documents: searchIndex.documents.length,
            indexSize: searchIndex.index.size,
            cacheSize: searchCache.size,
            lastUpdated: new Date(searchIndex.lastUpdated).toLocaleString()
        })
    };

    /**
     * Replace original search function
     */
    function enhanceOriginalSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) {
            return;
        }

        // Store original search function
        const originalSearch = window.performSearch;
        if (!originalSearch) {
            return;
        }

        // Replace with optimized version
        window.performSearch = function() {
            const query = searchInput.value.trim();

            if (query.length < config.minQueryLength) {
                if (originalSearch) {
                    originalSearch.call(this);
                }
                return;
            }

            // Use optimized search
            const results = optimizedSearch(query);

            // Display results
            displayOptimizedResults(query, results);

            // Track search
            if (window.Analytics) {
                window.Analytics.track('Search', 'Optimized Query', query, results.length);
            }
        };

        console.log('✅ Original search function enhanced');
    }

    /**
     * Display optimized search results
     */
    function displayOptimizedResults(query, results) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) {
            return;
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>未找到"${query}"的相关结果</p>
                    <p class="hint">试试其他关键词，或使用模糊搜索</p>
                </div>
            `;
            resultsContainer.style.display = 'block';
            return;
        }

        const queryWords = tokenize(query);
        const html = results.map(result => {
            const snippet = highlightTerms(result.content, queryWords);
            const icon = result.type === 'formula' ? 'calculator' :
                        result.type === 'case' ? 'file-alt' : 'book';

            return `
                <div class="search-result-item" data-type="${result.type}" data-id="${result.id}">
                    <div class="result-icon">
                        <i class="fas fa-${icon}"></i>
                    </div>
                    <div class="result-content">
                        <h4>${highlightTerms(result.title, queryWords, 100)}</h4>
                        ${result.category ? `<span class="result-category">${result.category}</span>` : ''}
                        <p>${snippet}</p>
                        <div class="result-meta">
                            <span class="result-type">${result.type}</span>
                            <span class="result-score">相关度: ${(result.score + result.relevance).toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        resultsContainer.innerHTML = `
            <div class="search-results-header">
                找到 <strong>${results.length}</strong> 个相关结果
            </div>
            ${html}
        `;
        resultsContainer.style.display = 'block';
    }

    /**
     * Initialize
     */
    function init() {
        console.log('🔍 Search optimizer initializing...');

        // Try to load cached index
        const loaded = loadCachedIndex();

        // Build index if not cached or expired
        if (!loaded) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', buildSearchIndex);
            } else {
                buildSearchIndex();
            }
        }

        // Enhance original search when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', enhanceOriginalSearch);
        } else {
            enhanceOriginalSearch();
        }

        console.log('✅ Search optimizer loaded');
    }

    // Initialize
    init();

})();
