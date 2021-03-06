/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
    }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function () { called = true })
        var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
        setTimeout(callback, duration)
        return this
    }

    $(function () {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function (e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var Alert   = function (el) {
        $(el).on('click', dismiss, this.close)
    }

    Alert.VERSION = '3.3.7'

    Alert.TRANSITION_DURATION = 150

    Alert.prototype.close = function (e) {
        var $this    = $(this)
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector === '#' ? [] : selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.closest('.alert')
        }

        $parent.trigger(e = $.Event('close.bs.alert'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            // detach from parent, fire event then clean up data
            $parent.detach().trigger('closed.bs.alert').remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
                .one('bsTransitionEnd', removeElement)
                .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
            removeElement()
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.alert')

            if (!data) $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.alert

    $.fn.alert             = Plugin
    $.fn.alert.Constructor = Alert


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function () {
        $.fn.alert = old
        return this
    }


    // ALERT DATA-API
    // ==============

    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var Button = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, Button.DEFAULTS, options)
        this.isLoading = false
    }

    Button.VERSION  = '3.3.7'

    Button.DEFAULTS = {
        loadingText: 'loading...'
    }

    Button.prototype.setState = function (state) {
        var d    = 'disabled'
        var $el  = this.$element
        var val  = $el.is('input') ? 'val' : 'html'
        var data = $el.data()

        state += 'Text'

        if (data.resetText == null) $el.data('resetText', $el[val]())

        // push to event loop to allow forms to submit
        setTimeout($.proxy(function () {
            $el[val](data[state] == null ? this.options[state] : data[state])

            if (state == 'loadingText') {
                this.isLoading = true
                $el.addClass(d).attr(d, d).prop(d, true)
            } else if (this.isLoading) {
                this.isLoading = false
                $el.removeClass(d).removeAttr(d).prop(d, false)
            }
        }, this), 0)
    }

    Button.prototype.toggle = function () {
        var changed = true
        var $parent = this.$element.closest('[data-toggle="buttons"]')

        if ($parent.length) {
            var $input = this.$element.find('input')
            if ($input.prop('type') == 'radio') {
                if ($input.prop('checked')) changed = false
                $parent.find('.active').removeClass('active')
                this.$element.addClass('active')
            } else if ($input.prop('type') == 'checkbox') {
                if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
                this.$element.toggleClass('active')
            }
            $input.prop('checked', this.$element.hasClass('active'))
            if (changed) $input.trigger('change')
        } else {
            this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
            this.$element.toggleClass('active')
        }
    }


    // BUTTON PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.button')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.button', (data = new Button(this, options)))

            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }

    var old = $.fn.button

    $.fn.button             = Plugin
    $.fn.button.Constructor = Button


    // BUTTON NO CONFLICT
    // ==================

    $.fn.button.noConflict = function () {
        $.fn.button = old
        return this
    }


    // BUTTON DATA-API
    // ===============

    $(document)
        .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
            var $btn = $(e.target).closest('.btn')
            Plugin.call($btn, 'toggle')
            if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
                // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
                e.preventDefault()
                // The target component still receive the focus
                if ($btn.is('input,button')) $btn.trigger('focus')
                else $btn.find('input:visible,button:visible').first().trigger('focus')
            }
        })
        .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
            $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
        })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function (element, options) {
        this.$element    = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options     = options
        this.paused      = null
        this.sliding     = null
        this.interval    = null
        this.$active     = null
        this.$items      = null

        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
            .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
            .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
    }

    Carousel.VERSION  = '3.3.7'

    Carousel.TRANSITION_DURATION = 600

    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    }

    Carousel.prototype.keydown = function (e) {
        if (/input|textarea/i.test(e.target.tagName)) return
        switch (e.which) {
            case 37: this.prev(); break
            case 39: this.next(); break
            default: return
        }

        e.preventDefault()
    }

    Carousel.prototype.cycle = function (e) {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    Carousel.prototype.getItemIndex = function (item) {
        this.$items = item.parent().children('.item')
        return this.$items.index(item || this.$active)
    }

    Carousel.prototype.getItemForDirection = function (direction, active) {
        var activeIndex = this.getItemIndex(active)
        var willWrap = (direction == 'prev' && activeIndex === 0)
            || (direction == 'next' && activeIndex == (this.$items.length - 1))
        if (willWrap && !this.options.wrap) return active
        var delta = direction == 'prev' ? -1 : 1
        var itemIndex = (activeIndex + delta) % this.$items.length
        return this.$items.eq(itemIndex)
    }

    Carousel.prototype.to = function (pos) {
        var that        = this
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

        if (pos > (this.$items.length - 1) || pos < 0) return

        if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
        if (activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
    }

    Carousel.prototype.pause = function (e) {
        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    Carousel.prototype.next = function () {
        if (this.sliding) return
        return this.slide('next')
    }

    Carousel.prototype.prev = function () {
        if (this.sliding) return
        return this.slide('prev')
    }

    Carousel.prototype.slide = function (type, next) {
        var $active   = this.$element.find('.item.active')
        var $next     = next || this.getItemForDirection(type, $active)
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var that      = this

        if ($next.hasClass('active')) return (this.sliding = false)

        var relatedTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)
        if (slideEvent.isDefaultPrevented()) return

        this.sliding = true

        isCycling && this.pause()

        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass('active')
        }

        var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one('bsTransitionEnd', function () {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function () {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
        } else {
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger(slidEvent)
        }

        isCycling && this.cycle()

        return this
    }


    // CAROUSEL PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action  = typeof option == 'string' ? option : options.slide

            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    var old = $.fn.carousel

    $.fn.carousel             = Plugin
    $.fn.carousel.Constructor = Carousel


    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function () {
        $.fn.carousel = old
        return this
    }


    // CAROUSEL DATA-API
    // =================

    var clickHandler = function (e) {
        var href
        var $this   = $(this)
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
        if (!$target.hasClass('carousel')) return
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex) options.interval = false

        Plugin.call($target, options)

        if (slideIndex) {
            $target.data('bs.carousel').to(slideIndex)
        }

        e.preventDefault()
    }

    $(document)
        .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
        .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

    $(window).on('load', function () {
        $('[data-ride="carousel"]').each(function () {
            var $carousel = $(this)
            Plugin.call($carousel, $carousel.data())
        })
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
    'use strict';

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function (element, options) {
        this.$element      = $(element)
        this.options       = $.extend({}, Collapse.DEFAULTS, options)
        this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
            '[data-toggle="collapse"][data-target="#' + element.id + '"]')
        this.transitioning = null

        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }

        if (this.options.toggle) this.toggle()
    }

    Collapse.VERSION  = '3.3.7'

    Collapse.TRANSITION_DURATION = 350

    Collapse.DEFAULTS = {
        toggle: true
    }

    Collapse.prototype.dimension = function () {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }

    Collapse.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass('in')) return

        var activesData
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

        if (actives && actives.length) {
            activesData = actives.data('bs.collapse')
            if (activesData && activesData.transitioning) return
        }

        var startEvent = $.Event('show.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        if (actives && actives.length) {
            Plugin.call(actives, 'hide')
            activesData || actives.data('bs.collapse', null)
        }

        var dimension = this.dimension()

        this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)
            .attr('aria-expanded', true)

        this.$trigger
            .removeClass('collapsed')
            .attr('aria-expanded', true)

        this.transitioning = 1

        var complete = function () {
            this.$element
                .removeClass('collapsing')
                .addClass('collapse in')[dimension]('')
            this.transitioning = 0
            this.$element
                .trigger('shown.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$element
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight

        this.$element
            .addClass('collapsing')
            .removeClass('collapse in')
            .attr('aria-expanded', false)

        this.$trigger
            .addClass('collapsed')
            .attr('aria-expanded', false)

        this.transitioning = 1

        var complete = function () {
            this.transitioning = 0
            this.$element
                .removeClass('collapsing')
                .addClass('collapse')
                .trigger('hidden.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        this.$element
            [dimension](0)
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }

    Collapse.prototype.toggle = function () {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

    Collapse.prototype.getParent = function () {
        return $(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each($.proxy(function (i, element) {
                var $element = $(element)
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this))
            .end()
    }

    Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
        var isOpen = $element.hasClass('in')

        $element.attr('aria-expanded', isOpen)
        $trigger
            .toggleClass('collapsed', !isOpen)
            .attr('aria-expanded', isOpen)
    }

    function getTargetFromTrigger($trigger) {
        var href
        var target = $trigger.attr('data-target')
            || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

        return $(target)
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.collapse')
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
            if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.collapse

    $.fn.collapse             = Plugin
    $.fn.collapse.Constructor = Collapse


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old
        return this
    }


    // COLLAPSE DATA-API
    // =================

    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
        var $this   = $(this)

        if (!$this.attr('data-target')) e.preventDefault()

        var $target = getTargetFromTrigger($this)
        var data    = $target.data('bs.collapse')
        var option  = data ? 'toggle' : $this.data()

        Plugin.call($target, option)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // DROPDOWN CLASS DEFINITION
    // =========================

    var backdrop = '.dropdown-backdrop'
    var toggle   = '[data-toggle="dropdown"]'
    var Dropdown = function (element) {
        $(element).on('click.bs.dropdown', this.toggle)
    }

    Dropdown.VERSION = '3.3.7'

    function getParent($this) {
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = selector && $(selector)

        return $parent && $parent.length ? $parent : $this.parent()
    }

    function clearMenus(e) {
        if (e && e.which === 3) return
        $(backdrop).remove()
        $(toggle).each(function () {
            var $this         = $(this)
            var $parent       = getParent($this)
            var relatedTarget = { relatedTarget: this }

            if (!$parent.hasClass('open')) return

            if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this.attr('aria-expanded', 'false')
            $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
        })
    }

    Dropdown.prototype.toggle = function (e) {
        var $this = $(this)

        if ($this.is('.disabled, :disabled')) return

        var $parent  = getParent($this)
        var isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we use a backdrop because click events don't delegate
                $(document.createElement('div'))
                    .addClass('dropdown-backdrop')
                    .insertAfter($(this))
                    .on('click', clearMenus)
            }

            var relatedTarget = { relatedTarget: this }
            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this
                .trigger('focus')
                .attr('aria-expanded', 'true')

            $parent
                .toggleClass('open')
                .trigger($.Event('shown.bs.dropdown', relatedTarget))
        }

        return false
    }

    Dropdown.prototype.keydown = function (e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

        var $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if ($this.is('.disabled, :disabled')) return

        var $parent  = getParent($this)
        var isActive = $parent.hasClass('open')

        if (!isActive && e.which != 27 || isActive && e.which == 27) {
            if (e.which == 27) $parent.find(toggle).trigger('focus')
            return $this.trigger('click')
        }

        var desc = ' li:not(.disabled):visible a'
        var $items = $parent.find('.dropdown-menu' + desc)

        if (!$items.length) return

        var index = $items.index(e.target)

        if (e.which == 38 && index > 0)                 index--         // up
        if (e.which == 40 && index < $items.length - 1) index++         // down
        if (!~index)                                    index = 0

        $items.eq(index).trigger('focus')
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.dropdown')

            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.dropdown

    $.fn.dropdown             = Plugin
    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old
        return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================

    $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function (element, options) {
        this.options             = options
        this.$body               = $(document.body)
        this.$element            = $(element)
        this.$dialog             = this.$element.find('.modal-dialog')
        this.$backdrop           = null
        this.isShown             = null
        this.originalBodyPad     = null
        this.scrollbarWidth      = 0
        this.ignoreBackdropClick = false

        if (this.options.remote) {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function () {
                    this.$element.trigger('loaded.bs.modal')
                }, this))
        }
    }

    Modal.VERSION  = '3.3.7'

    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }

    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    }

    Modal.prototype.show = function (_relatedTarget) {
        var that = this
        var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.checkScrollbar()
        this.setScrollbar()
        this.$body.addClass('modal-open')

        this.escape()
        this.resize()

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

        this.$dialog.on('mousedown.dismiss.bs.modal', function () {
            that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
            })
        })

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0)

            that.adjustDialog()

            if (transition) {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element.addClass('in')

            that.enforceFocus()

            var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

            transition ?
                that.$dialog // wait for modal to slide in
                    .one('bsTransitionEnd', function () {
                        that.$element.trigger('focus').trigger(e)
                    })
                    .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
        })
    }

    Modal.prototype.hide = function (e) {
        if (e) e.preventDefault()

        e = $.Event('hide.bs.modal')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()
        this.resize()

        $(document).off('focusin.bs.modal')

        this.$element
            .removeClass('in')
            .off('click.dismiss.bs.modal')
            .off('mouseup.dismiss.bs.modal')

        this.$dialog.off('mousedown.dismiss.bs.modal')

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
                .one('bsTransitionEnd', $.proxy(this.hideModal, this))
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal()
    }

    Modal.prototype.enforceFocus = function () {
        $(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function (e) {
                if (document !== e.target &&
                    this.$element[0] !== e.target &&
                    !this.$element.has(e.target).length) {
                    this.$element.trigger('focus')
                }
            }, this))
    }

    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal')
        }
    }

    Modal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
        } else {
            $(window).off('resize.bs.modal')
        }
    }

    Modal.prototype.hideModal = function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
            that.$body.removeClass('modal-open')
            that.resetAdjustments()
            that.resetScrollbar()
            that.$element.trigger('hidden.bs.modal')
        })
    }

    Modal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Modal.prototype.backdrop = function (callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate

            this.$backdrop = $(document.createElement('div'))
                .addClass('modal-backdrop ' + animate)
                .appendTo(this.$body)

            this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false
                    return
                }
                if (e.target !== e.currentTarget) return
                this.options.backdrop == 'static'
                    ? this.$element[0].focus()
                    : this.hide()
            }, this))

            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            if (!callback) return

            doAnimate ?
                this.$backdrop
                    .one('bsTransitionEnd', callback)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')

            var callbackRemove = function () {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                    .one('bsTransitionEnd', callbackRemove)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

        } else if (callback) {
            callback()
        }
    }

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function () {
        this.adjustDialog()
    }

    Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

        this.$element.css({
            paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    }

    Modal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    }

    Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect()
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
        this.scrollbarWidth = this.measureScrollbar()
    }

    Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        this.originalBodyPad = document.body.style.paddingRight || ''
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    Modal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad)
    }

    Modal.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }


    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget)
            else if (options.show) data.show(_relatedTarget)
        })
    }

    var old = $.fn.modal

    $.fn.modal             = Plugin
    $.fn.modal.Constructor = Modal


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
        $.fn.modal = old
        return this
    }


    // MODAL DATA-API
    // ==============

    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this   = $(this)
        var href    = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
        var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

        if ($this.is('a')) e.preventDefault()

        $target.one('show.bs.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function () {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // TOOLTIP PUBLIC CLASS DEFINITION
    // ===============================

    var Tooltip = function (element, options) {
        this.type       = null
        this.options    = null
        this.enabled    = null
        this.timeout    = null
        this.hoverState = null
        this.$element   = null
        this.inState    = null

        this.init('tooltip', element, options)
    }

    Tooltip.VERSION  = '3.3.7'

    Tooltip.TRANSITION_DURATION = 150

    Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
            selector: 'body',
            padding: 0
        }
    }

    Tooltip.prototype.init = function (type, element, options) {
        this.enabled   = true
        this.type      = type
        this.$element  = $(element)
        this.options   = this.getOptions(options)
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
        this.inState   = { click: false, hover: false, focus: false }

        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
            throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
        }

        var triggers = this.options.trigger.split(' ')

        for (var i = triggers.length; i--;) {
            var trigger = triggers[i]

            if (trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if (trigger != 'manual') {
                var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

                this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }

        this.options.selector ?
            (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
            this.fixTitle()
    }

    Tooltip.prototype.getDefaults = function () {
        return Tooltip.DEFAULTS
    }

    Tooltip.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)

        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }

        return options
    }

    Tooltip.prototype.getDelegateOptions = function () {
        var options  = {}
        var defaults = this.getDefaults()

        this._options && $.each(this._options, function (key, value) {
            if (defaults[key] != value) options[key] = value
        })

        return options
    }

    Tooltip.prototype.enter = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }

        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
        }

        if (self.tip().hasClass('in') || self.hoverState == 'in') {
            self.hoverState = 'in'
            return
        }

        clearTimeout(self.timeout)

        self.hoverState = 'in'

        if (!self.options.delay || !self.options.delay.show) return self.show()

        self.timeout = setTimeout(function () {
            if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
    }

    Tooltip.prototype.isInStateTrue = function () {
        for (var key in this.inState) {
            if (this.inState[key]) return true
        }

        return false
    }

    Tooltip.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }

        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
        }

        if (self.isInStateTrue()) return

        clearTimeout(self.timeout)

        self.hoverState = 'out'

        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.timeout = setTimeout(function () {
            if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
    }

    Tooltip.prototype.show = function () {
        var e = $.Event('show.bs.' + this.type)

        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e)

            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
            if (e.isDefaultPrevented() || !inDom) return
            var that = this

            var $tip = this.tip()

            var tipId = this.getUID(this.type)

            this.setContent()
            $tip.attr('id', tipId)
            this.$element.attr('aria-describedby', tipId)

            if (this.options.animation) $tip.addClass('fade')

            var placement = typeof this.options.placement == 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement

            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

            $tip
                .detach()
                .css({ top: 0, left: 0, display: 'block' })
                .addClass(placement)
                .data('bs.' + this.type, this)

            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
            this.$element.trigger('inserted.bs.' + this.type)

            var pos          = this.getPosition()
            var actualWidth  = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight

            if (autoPlace) {
                var orgPlacement = placement
                var viewportDim = this.getPosition(this.$viewport)

                placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                        placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                            placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                                placement

                $tip
                    .removeClass(orgPlacement)
                    .addClass(placement)
            }

            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

            this.applyPlacement(calculatedOffset, placement)

            var complete = function () {
                var prevHoverState = that.hoverState
                that.$element.trigger('shown.bs.' + that.type)
                that.hoverState = null

                if (prevHoverState == 'out') that.leave(that)
            }

            $.support.transition && this.$tip.hasClass('fade') ?
                $tip
                    .one('bsTransitionEnd', complete)
                    .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
                complete()
        }
    }

    Tooltip.prototype.applyPlacement = function (offset, placement) {
        var $tip   = this.tip()
        var width  = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight

        // manually read margins because getBoundingClientRect includes difference
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)

        // we must check for NaN for ie 8/9
        if (isNaN(marginTop))  marginTop  = 0
        if (isNaN(marginLeft)) marginLeft = 0

        offset.top  += marginTop
        offset.left += marginLeft

        // $.fn.offset doesn't round pixel values
        // so we use setOffset directly with our own function B-0
        $.offset.setOffset($tip[0], $.extend({
            using: function (props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                })
            }
        }, offset), 0)

        $tip.addClass('in')

        // check to see if placing tip in new offset caused the tip to resize itself
        var actualWidth  = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        if (placement == 'top' && actualHeight != height) {
            offset.top = offset.top + height - actualHeight
        }

        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

        if (delta.left) offset.left += delta.left
        else offset.top += delta.top

        var isVertical          = /top|bottom/.test(placement)
        var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

        $tip.offset(offset)
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
    }

    Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
        this.arrow()
            .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
            .css(isVertical ? 'top' : 'left', '')
    }

    Tooltip.prototype.setContent = function () {
        var $tip  = this.tip()
        var title = this.getTitle()

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }

    Tooltip.prototype.hide = function (callback) {
        var that = this
        var $tip = $(this.$tip)
        var e    = $.Event('hide.bs.' + this.type)

        function complete() {
            if (that.hoverState != 'in') $tip.detach()
            if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
                that.$element
                    .removeAttr('aria-describedby')
                    .trigger('hidden.bs.' + that.type)
            }
            callback && callback()
        }

        this.$element.trigger(e)

        if (e.isDefaultPrevented()) return

        $tip.removeClass('in')

        $.support.transition && $tip.hasClass('fade') ?
            $tip
                .one('bsTransitionEnd', complete)
                .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
            complete()

        this.hoverState = null

        return this
    }

    Tooltip.prototype.fixTitle = function () {
        var $e = this.$element
        if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }

    Tooltip.prototype.hasContent = function () {
        return this.getTitle()
    }

    Tooltip.prototype.getPosition = function ($element) {
        $element   = $element || this.$element

        var el     = $element[0]
        var isBody = el.tagName == 'BODY'

        var elRect    = el.getBoundingClientRect()
        if (elRect.width == null) {
            // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
            elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
        }
        var isSvg = window.SVGElement && el instanceof window.SVGElement
        // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
        // See https://github.com/twbs/bootstrap/issues/20280
        var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
        var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
        var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

        return $.extend({}, elRect, scroll, outerDims, elOffset)
    }

    Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
            placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
                placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
                    /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

    }

    Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
        var delta = { top: 0, left: 0 }
        if (!this.$viewport) return delta

        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
        var viewportDimensions = this.getPosition(this.$viewport)

        if (/right|left/.test(placement)) {
            var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
            if (topEdgeOffset < viewportDimensions.top) { // top overflow
                delta.top = viewportDimensions.top - topEdgeOffset
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
            }
        } else {
            var leftEdgeOffset  = pos.left - viewportPadding
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth
            if (leftEdgeOffset < viewportDimensions.left) { // left overflow
                delta.left = viewportDimensions.left - leftEdgeOffset
            } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
            }
        }

        return delta
    }

    Tooltip.prototype.getTitle = function () {
        var title
        var $e = this.$element
        var o  = this.options

        title = $e.attr('data-original-title')
            || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

        return title
    }

    Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
    }

    Tooltip.prototype.tip = function () {
        if (!this.$tip) {
            this.$tip = $(this.options.template)
            if (this.$tip.length != 1) {
                throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
            }
        }
        return this.$tip
    }

    Tooltip.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
    }

    Tooltip.prototype.enable = function () {
        this.enabled = true
    }

    Tooltip.prototype.disable = function () {
        this.enabled = false
    }

    Tooltip.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }

    Tooltip.prototype.toggle = function (e) {
        var self = this
        if (e) {
            self = $(e.currentTarget).data('bs.' + this.type)
            if (!self) {
                self = new this.constructor(e.currentTarget, this.getDelegateOptions())
                $(e.currentTarget).data('bs.' + this.type, self)
            }
        }

        if (e) {
            self.inState.click = !self.inState.click
            if (self.isInStateTrue()) self.enter(self)
            else self.leave(self)
        } else {
            self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
        }
    }

    Tooltip.prototype.destroy = function () {
        var that = this
        clearTimeout(this.timeout)
        this.hide(function () {
            that.$element.off('.' + that.type).removeData('bs.' + that.type)
            if (that.$tip) {
                that.$tip.detach()
            }
            that.$tip = null
            that.$arrow = null
            that.$viewport = null
            that.$element = null
        })
    }


    // TOOLTIP PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.tooltip')
            var options = typeof option == 'object' && option

            if (!data && /destroy|hide/.test(option)) return
            if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tooltip

    $.fn.tooltip             = Plugin
    $.fn.tooltip.Constructor = Tooltip


    // TOOLTIP NO CONFLICT
    // ===================

    $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old
        return this
    }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var Popover = function (element, options) {
        this.init('popover', element, options)
    }

    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

    Popover.VERSION  = '3.3.7'

    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })


    // NOTE: POPOVER EXTENDS tooltip.js
    // ================================

    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

    Popover.prototype.constructor = Popover

    Popover.prototype.getDefaults = function () {
        return Popover.DEFAULTS
    }

    Popover.prototype.setContent = function () {
        var $tip    = this.tip()
        var title   = this.getTitle()
        var content = this.getContent()

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
            this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
            ](content)

        $tip.removeClass('fade top bottom left right in')

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
    }

    Popover.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }

    Popover.prototype.getContent = function () {
        var $e = this.$element
        var o  = this.options

        return $e.attr('data-content')
            || (typeof o.content == 'function' ?
                o.content.call($e[0]) :
                o.content)
    }

    Popover.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
    }


    // POPOVER PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.popover')
            var options = typeof option == 'object' && option

            if (!data && /destroy|hide/.test(option)) return
            if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.popover

    $.fn.popover             = Plugin
    $.fn.popover.Constructor = Popover


    // POPOVER NO CONFLICT
    // ===================

    $.fn.popover.noConflict = function () {
        $.fn.popover = old
        return this
    }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // SCROLLSPY CLASS DEFINITION
    // ==========================

    function ScrollSpy(element, options) {
        this.$body          = $(document.body)
        this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
        this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
        this.selector       = (this.options.target || '') + ' .nav li > a'
        this.offsets        = []
        this.targets        = []
        this.activeTarget   = null
        this.scrollHeight   = 0

        this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
        this.refresh()
        this.process()
    }

    ScrollSpy.VERSION  = '3.3.7'

    ScrollSpy.DEFAULTS = {
        offset: 10
    }

    ScrollSpy.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }

    ScrollSpy.prototype.refresh = function () {
        var that          = this
        var offsetMethod  = 'offset'
        var offsetBase    = 0

        this.offsets      = []
        this.targets      = []
        this.scrollHeight = this.getScrollHeight()

        if (!$.isWindow(this.$scrollElement[0])) {
            offsetMethod = 'position'
            offsetBase   = this.$scrollElement.scrollTop()
        }

        this.$body
            .find(this.selector)
            .map(function () {
                var $el   = $(this)
                var href  = $el.data('target') || $el.attr('href')
                var $href = /^#./.test(href) && $(href)

                return ($href
                    && $href.length
                    && $href.is(':visible')
                    && [[$href[offsetMethod]().top + offsetBase, href]]) || null
            })
            .sort(function (a, b) { return a[0] - b[0] })
            .each(function () {
                that.offsets.push(this[0])
                that.targets.push(this[1])
            })
    }

    ScrollSpy.prototype.process = function () {
        var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this.getScrollHeight()
        var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
        var offsets      = this.offsets
        var targets      = this.targets
        var activeTarget = this.activeTarget
        var i

        if (this.scrollHeight != scrollHeight) {
            this.refresh()
        }

        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
        }

        if (activeTarget && scrollTop < offsets[0]) {
            this.activeTarget = null
            return this.clear()
        }

        for (i = offsets.length; i--;) {
            activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
            && this.activate(targets[i])
        }
    }

    ScrollSpy.prototype.activate = function (target) {
        this.activeTarget = target

        this.clear()

        var selector = this.selector +
            '[data-target="' + target + '"],' +
            this.selector + '[href="' + target + '"]'

        var active = $(selector)
            .parents('li')
            .addClass('active')

        if (active.parent('.dropdown-menu').length) {
            active = active
                .closest('li.dropdown')
                .addClass('active')
        }

        active.trigger('activate.bs.scrollspy')
    }

    ScrollSpy.prototype.clear = function () {
        $(this.selector)
            .parentsUntil(this.options.target, '.active')
            .removeClass('active')
    }


    // SCROLLSPY PLUGIN DEFINITION
    // ===========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.scrollspy')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.scrollspy

    $.fn.scrollspy             = Plugin
    $.fn.scrollspy.Constructor = ScrollSpy


    // SCROLLSPY NO CONFLICT
    // =====================

    $.fn.scrollspy.noConflict = function () {
        $.fn.scrollspy = old
        return this
    }


    // SCROLLSPY DATA-API
    // ==================

    $(window).on('load.bs.scrollspy.data-api', function () {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this)
            Plugin.call($spy, $spy.data())
        })
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function (element) {
        // jscs:disable requireDollarBeforejQueryAssignment
        this.element = $(element)
        // jscs:enable requireDollarBeforejQueryAssignment
    }

    Tab.VERSION = '3.3.7'

    Tab.TRANSITION_DURATION = 150

    Tab.prototype.show = function () {
        var $this    = this.element
        var $ul      = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.data('target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return

        var $previous = $ul.find('.active:last a')
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        })
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        })

        $previous.trigger(hideEvent)
        $this.trigger(showEvent)

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

        var $target = $(selector)

        this.activate($this.closest('li'), $ul)
        this.activate($target, $target.parent(), function () {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            })
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            })
        })
    }

    Tab.prototype.activate = function (element, container, callback) {
        var $active    = container.find('> .active')
        var transition = callback
            && $.support.transition
            && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

        function next() {
            $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active')
                .end()
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', false)

            element
                .addClass('active')
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', true)

            if (transition) {
                element[0].offsetWidth // reflow for transition
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }

            if (element.parent('.dropdown-menu').length) {
                element
                    .closest('li.dropdown')
                    .addClass('active')
                    .end()
                    .find('[data-toggle="tab"]')
                    .attr('aria-expanded', true)
            }

            callback && callback()
        }

        $active.length && transition ?
            $active
                .one('bsTransitionEnd', next)
                .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
            next()

        $active.removeClass('in')
    }


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.tab')

            if (!data) $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab

    $.fn.tab             = Plugin
    $.fn.tab.Constructor = Tab


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old
        return this
    }


    // TAB DATA-API
    // ============

    var clickHandler = function (e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    }

    $(document)
        .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
        .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // AFFIX CLASS DEFINITION
    // ======================

    var Affix = function (element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options)

        this.$target = $(this.options.target)
            .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
            .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

        this.$element     = $(element)
        this.affixed      = null
        this.unpin        = null
        this.pinnedOffset = null

        this.checkPosition()
    }

    Affix.VERSION  = '3.3.7'

    Affix.RESET    = 'affix affix-top affix-bottom'

    Affix.DEFAULTS = {
        offset: 0,
        target: window
    }

    Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop    = this.$target.scrollTop()
        var position     = this.$element.offset()
        var targetHeight = this.$target.height()

        if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

        if (this.affixed == 'bottom') {
            if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
            return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
        }

        var initializing   = this.affixed == null
        var colliderTop    = initializing ? scrollTop : position.top
        var colliderHeight = initializing ? targetHeight : height

        if (offsetTop != null && scrollTop <= offsetTop) return 'top'
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

        return false
    }

    Affix.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset
        this.$element.removeClass(Affix.RESET).addClass('affix')
        var scrollTop = this.$target.scrollTop()
        var position  = this.$element.offset()
        return (this.pinnedOffset = position.top - scrollTop)
    }

    Affix.prototype.checkPositionWithEventLoop = function () {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }

    Affix.prototype.checkPosition = function () {
        if (!this.$element.is(':visible')) return

        var height       = this.$element.height()
        var offset       = this.options.offset
        var offsetTop    = offset.top
        var offsetBottom = offset.bottom
        var scrollHeight = Math.max($(document).height(), $(document.body).height())

        if (typeof offset != 'object')         offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

        if (this.affixed != affix) {
            if (this.unpin != null) this.$element.css('top', '')

            var affixType = 'affix' + (affix ? '-' + affix : '')
            var e         = $.Event(affixType + '.bs.affix')

            this.$element.trigger(e)

            if (e.isDefaultPrevented()) return

            this.affixed = affix
            this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

            this.$element
                .removeClass(Affix.RESET)
                .addClass(affixType)
                .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
        }

        if (affix == 'bottom') {
            this.$element.offset({
                top: scrollHeight - height - offsetBottom
            })
        }
    }


    // AFFIX PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.affix')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.affix

    $.fn.affix             = Plugin
    $.fn.affix.Constructor = Affix


    // AFFIX NO CONFLICT
    // =================

    $.fn.affix.noConflict = function () {
        $.fn.affix = old
        return this
    }


    // AFFIX DATA-API
    // ==============

    $(window).on('load', function () {
        $('[data-spy="affix"]').each(function () {
            var $spy = $(this)
            var data = $spy.data()

            data.offset = data.offset || {}

            if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
            if (data.offsetTop    != null) data.offset.top    = data.offsetTop

            Plugin.call($spy, data)
        })
    })

}(jQuery);

// Generated by CoffeeScript 1.6.1
(function() {
  var $, Analyze, Blender, Calculate, Caman, CamanParser, Canvas, Convert, Event, Fiber, Filter, IO, Image, Layer, Log, Logger, PixelInfo, Plugin, Renderer, Root, Store, Util, fs, slice, vignetteFilters,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice,
    _this = this;

  slice = Array.prototype.slice;

  $ = function(sel, root) {
    if (root == null) {
      root = document;
    }
    if (typeof sel === "object" || (typeof exports !== "undefined" && exports !== null)) {
      return sel;
    }
    return root.querySelector(sel);
  };

  Util = (function() {

    function Util() {}

    Util.uniqid = (function() {
      var id;
      id = 0;
      return {
        get: function() {
          return id++;
        }
      };
    })();

    Util.extend = function(obj) {
      var copy, dest, prop, src, _i, _len;
      dest = obj;
      src = slice.call(arguments, 1);
      for (_i = 0, _len = src.length; _i < _len; _i++) {
        copy = src[_i];
        for (prop in copy) {
          if (!__hasProp.call(copy, prop)) continue;
          dest[prop] = copy[prop];
        }
      }
      return dest;
    };

    Util.clampRGB = function(val) {
      if (val < 0) {
        return 0;
      }
      if (val > 255) {
        return 255;
      }
      return val;
    };

    Util.copyAttributes = function(from, to, opts) {
      var attr, _i, _len, _ref, _ref1, _results;
      if (opts == null) {
        opts = {};
      }
      _ref = from.attributes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        if ((opts.except != null) && (_ref1 = attr.nodeName, __indexOf.call(opts.except, _ref1) >= 0)) {
          continue;
        }
        _results.push(to.setAttribute(attr.nodeName, attr.nodeValue));
      }
      return _results;
    };

    Util.dataArray = function(length) {
      if (length == null) {
        length = 0;
      }
      if (Caman.NodeJS || (window.Uint8Array != null)) {
        return new Uint8Array(length);
      }
      return new Array(length);
    };

    return Util;

  })();

  if (typeof exports !== "undefined" && exports !== null) {
    Root = exports;
    Canvas = require('canvas');
    Image = Canvas.Image;
    Fiber = require('fibers');
    fs = require('fs');
  } else {
    Root = window;
  }

  Root.Caman = Caman = (function() {

    Caman.version = {
      release: "4.1.1",
      date: "4/8/2013"
    };

    Caman.DEBUG = false;

    Caman.NodeJS = typeof exports !== "undefined" && exports !== null;

    Caman.autoload = !Caman.NodeJS;

    Caman.allowRevert = true;

    Caman.crossOrigin = "anonymous";

    Caman.toString = function() {
      return "Version " + Caman.version.release + ", Released " + Caman.version.date;
    };

    Caman.remoteProxy = "";

    Caman.proxyParam = "camanProxyUrl";

    Caman.getAttrId = function(canvas) {
      if (Caman.NodeJS) {
        return true;
      }
      if (typeof canvas === "string") {
        canvas = $(canvas);
      }
      if (!((canvas != null) && (canvas.getAttribute != null))) {
        return null;
      }
      return canvas.getAttribute('data-caman-id');
    };

    function Caman() {
      var args, callback, id,
        _this = this;
      if (arguments.length === 0) {
        throw "Invalid arguments";
      }
      if (this instanceof Caman) {
        this.finishInit = this.finishInit.bind(this);
        this.imageLoaded = this.imageLoaded.bind(this);
        args = arguments[0];
        if (!Caman.NodeJS) {
          id = parseInt(Caman.getAttrId(args[0]), 10);
          callback = typeof args[1] === "function" ? args[1] : typeof args[2] === "function" ? args[2] : function() {};
          if (!isNaN(id) && Store.has(id)) {
            return Store.execute(id, callback);
          }
        }
        this.id = Util.uniqid.get();
        this.initializedPixelData = this.originalPixelData = null;
        this.cropCoordinates = {
          x: 0,
          y: 0
        };
        this.cropped = false;
        this.resized = false;
        this.pixelStack = [];
        this.layerStack = [];
        this.canvasQueue = [];
        this.currentLayer = null;
        this.scaled = false;
        this.analyze = new Analyze(this);
        this.renderer = new Renderer(this);
        this.domIsLoaded(function() {
          _this.parseArguments(args);
          return _this.setup();
        });
        return this;
      } else {
        return new Caman(arguments);
      }
    }

    Caman.prototype.domIsLoaded = function(cb) {
      var listener,
        _this = this;
      if (Caman.NodeJS) {
        return setTimeout(function() {
          return cb.call(_this);
        }, 0);
      } else {
        if (document.readyState === "complete") {
          Log.debug("DOM initialized");
          return setTimeout(function() {
            return cb.call(_this);
          }, 0);
        } else {
          listener = function() {
            if (document.readyState === "complete") {
              Log.debug("DOM initialized");
              return cb.call(_this);
            }
          };
          return document.addEventListener("readystatechange", listener, false);
        }
      }
    };

    Caman.prototype.parseArguments = function(args) {
      var key, val, _ref, _results;
      if (args.length === 0) {
        throw "Invalid arguments given";
      }
      this.initObj = null;
      this.initType = null;
      this.imageUrl = null;
      this.callback = function() {};
      this.setInitObject(args[0]);
      if (args.length === 1) {
        return;
      }
      switch (typeof args[1]) {
        case "string":
          this.imageUrl = args[1];
          break;
        case "function":
          this.callback = args[1];
      }
      if (args.length === 2) {
        return;
      }
      this.callback = args[2];
      if (args.length === 4) {
        _ref = args[4];
        _results = [];
        for (key in _ref) {
          if (!__hasProp.call(_ref, key)) continue;
          val = _ref[key];
          _results.push(this.options[key] = val);
        }
        return _results;
      }
    };

    Caman.prototype.setInitObject = function(obj) {
      if (Caman.NodeJS) {
        this.initObj = obj;
        this.initType = 'node';
        return;
      }
      if (typeof obj === "object") {
        this.initObj = obj;
      } else {
        this.initObj = $(obj);
      }
      if (this.initObj == null) {
        throw "Could not find image or canvas for initialization.";
      }
      return this.initType = this.initObj.nodeName.toLowerCase();
    };

    Caman.prototype.setup = function() {
      switch (this.initType) {
        case "node":
          return this.initNode();
        case "img":
          return this.initImage();
        case "canvas":
          return this.initCanvas();
      }
    };

    Caman.prototype.initNode = function() {
      var _this = this;
      Log.debug("Initializing for NodeJS");
      this.image = new Image();
      this.image.onload = function() {
        Log.debug("Image loaded. Width = " + (_this.imageWidth()) + ", Height = " + (_this.imageHeight()));
        _this.canvas = new Canvas(_this.imageWidth(), _this.imageHeight());
        return _this.finishInit();
      };
      this.image.onerror = function(err) {
        throw err;
      };
      return this.image.src = this.initObj;
    };

    Caman.prototype.initImage = function() {
      this.image = this.initObj;
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
      Util.copyAttributes(this.image, this.canvas, {
        except: ['src']
      });
      this.image.parentNode.replaceChild(this.canvas, this.image);
      this.imageAdjustments();
      return this.waitForImageLoaded();
    };

    Caman.prototype.initCanvas = function() {
      this.canvas = this.initObj;
      this.context = this.canvas.getContext('2d');
      if (this.imageUrl != null) {
        this.image = document.createElement('img');
        this.image.src = this.imageUrl;
        this.imageAdjustments();
        return this.waitForImageLoaded();
      } else {
        return this.finishInit();
      }
    };

    Caman.prototype.imageAdjustments = function() {
      if (this.needsHiDPISwap()) {
        Log.debug(this.image.src, "->", this.hiDPIReplacement());
        this.swapped = true;
        this.image.src = this.hiDPIReplacement();
      }
      if (IO.isRemote(this.image)) {
        this.image.src = IO.proxyUrl(this.image.src);
        return Log.debug("Remote image detected, using URL = " + this.image.src);
      }
    };

    Caman.prototype.waitForImageLoaded = function() {
      if (this.isImageLoaded()) {
        return this.imageLoaded();
      } else {
        return this.image.onload = this.imageLoaded;
      }
    };

    Caman.prototype.isImageLoaded = function() {
      if (!this.image.complete) {
        return false;
      }
      if ((this.image.naturalWidth != null) && this.image.naturalWidth === 0) {
        return false;
      }
      return true;
    };

    Caman.prototype.imageWidth = function() {
      return this.image.width || this.image.naturalWidth;
    };

    Caman.prototype.imageHeight = function() {
      return this.image.height || this.image.naturalHeight;
    };

    Caman.prototype.imageLoaded = function() {
      Log.debug("Image loaded. Width = " + (this.imageWidth()) + ", Height = " + (this.imageHeight()));
      if (this.swapped) {
        this.canvas.width = this.imageWidth() / this.hiDPIRatio();
        this.canvas.height = this.imageHeight() / this.hiDPIRatio();
      } else {
        this.canvas.width = this.imageWidth();
        this.canvas.height = this.imageHeight();
      }
      return this.finishInit();
    };

    Caman.prototype.finishInit = function() {
      var i, pixel, _i, _len, _ref;
      if (this.context == null) {
        this.context = this.canvas.getContext('2d');
      }
      this.originalWidth = this.preScaledWidth = this.width = this.canvas.width;
      this.originalHeight = this.preScaledHeight = this.height = this.canvas.height;
      this.hiDPIAdjustments();
      if (!this.hasId()) {
        this.assignId();
      }
      if (this.image != null) {
        this.context.drawImage(this.image, 0, 0, this.imageWidth(), this.imageHeight(), 0, 0, this.preScaledWidth, this.preScaledHeight);
      }
      this.reloadCanvasData();
      if (Caman.allowRevert) {
        this.initializedPixelData = Util.dataArray(this.pixelData.length);
        this.originalPixelData = Util.dataArray(this.pixelData.length);
        _ref = this.pixelData;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          pixel = _ref[i];
          this.initializedPixelData[i] = pixel;
          this.originalPixelData[i] = pixel;
        }
      }
      this.dimensions = {
        width: this.canvas.width,
        height: this.canvas.height
      };
      Store.put(this.id, this);
      this.callback.call(this, this);
      return this.callback = function() {};
    };

    Caman.prototype.reloadCanvasData = function() {
      this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      return this.pixelData = this.imageData.data;
    };

    Caman.prototype.resetOriginalPixelData = function() {
      var pixel, _i, _len, _ref, _results;
      if (!Caman.allowRevert) {
        throw "Revert disabled";
      }
      this.originalPixelData = Util.dataArray(this.pixelData.length);
      _ref = this.pixelData;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pixel = _ref[_i];
        _results.push(this.originalPixelData.push(pixel));
      }
      return _results;
    };

    Caman.prototype.hasId = function() {
      return Caman.getAttrId(this.canvas) != null;
    };

    Caman.prototype.assignId = function() {
      if (Caman.NodeJS || this.canvas.getAttribute('data-caman-id')) {
        return;
      }
      return this.canvas.setAttribute('data-caman-id', this.id);
    };

    Caman.prototype.hiDPIDisabled = function() {
      return this.canvas.getAttribute('data-caman-hidpi-disabled') !== null;
    };

    Caman.prototype.hiDPIAdjustments = function() {
      var ratio;
      if (Caman.NodeJS || this.hiDPIDisabled()) {
        return;
      }
      ratio = this.hiDPIRatio();
      if (ratio !== 1) {
        Log.debug("HiDPI ratio = " + ratio);
        this.scaled = true;
        this.preScaledWidth = this.canvas.width;
        this.preScaledHeight = this.canvas.height;
        this.canvas.width = this.preScaledWidth * ratio;
        this.canvas.height = this.preScaledHeight * ratio;
        this.canvas.style.width = "" + this.preScaledWidth + "px";
        this.canvas.style.height = "" + this.preScaledHeight + "px";
        this.context.scale(ratio, ratio);
        this.width = this.originalWidth = this.canvas.width;
        return this.height = this.originalHeight = this.canvas.height;
      }
    };

    Caman.prototype.hiDPIRatio = function() {
      var backingStoreRatio, devicePixelRatio;
      devicePixelRatio = window.devicePixelRatio || 1;
      backingStoreRatio = this.context.webkitBackingStorePixelRatio || this.context.mozBackingStorePixelRatio || this.context.msBackingStorePixelRatio || this.context.oBackingStorePixelRatio || this.context.backingStorePixelRatio || 1;
      return devicePixelRatio / backingStoreRatio;
    };

    Caman.prototype.hiDPICapable = function() {
      return (window.devicePixelRatio != null) && window.devicePixelRatio !== 1;
    };

    Caman.prototype.needsHiDPISwap = function() {
      if (this.hiDPIDisabled() || !this.hiDPICapable()) {
        return false;
      }
      return this.hiDPIReplacement() !== null;
    };

    Caman.prototype.hiDPIReplacement = function() {
      if (this.image == null) {
        return null;
      }
      return this.image.getAttribute('data-caman-hidpi');
    };

    Caman.prototype.replaceCanvas = function(newCanvas) {
      var oldCanvas;
      oldCanvas = this.canvas;
      this.canvas = newCanvas;
      this.context = this.canvas.getContext('2d');
      oldCanvas.parentNode.replaceChild(this.canvas, oldCanvas);
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.reloadCanvasData();
      return this.dimensions = {
        width: this.canvas.width,
        height: this.canvas.height
      };
    };

    Caman.prototype.render = function(callback) {
      var _this = this;
      if (callback == null) {
        callback = function() {};
      }
      Event.trigger(this, "renderStart");
      return this.renderer.execute(function() {
        _this.context.putImageData(_this.imageData, 0, 0);
        return callback.call(_this);
      });
    };

    Caman.prototype.revert = function() {
      var i, pixel, _i, _len, _ref;
      if (!Caman.allowRevert) {
        throw "Revert disabled";
      }
      _ref = this.originalVisiblePixels();
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        pixel = _ref[i];
        this.pixelData[i] = pixel;
      }
      return this.context.putImageData(this.imageData, 0, 0);
    };

    Caman.prototype.reset = function() {
      var canvas, ctx, i, imageData, pixel, pixelData, _i, _len, _ref;
      canvas = document.createElement('canvas');
      Util.copyAttributes(this.canvas, canvas);
      canvas.width = this.originalWidth;
      canvas.height = this.originalHeight;
      ctx = canvas.getContext('2d');
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      pixelData = imageData.data;
      _ref = this.initializedPixelData;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        pixel = _ref[i];
        pixelData[i] = pixel;
      }
      ctx.putImageData(imageData, 0, 0);
      this.cropCoordinates = {
        x: 0,
        y: 0
      };
      this.resized = false;
      return this.replaceCanvas(canvas);
    };

    Caman.prototype.originalVisiblePixels = function() {
      var canvas, coord, ctx, endX, endY, i, imageData, pixel, pixelData, pixels, scaledCanvas, startX, startY, width, _i, _j, _len, _ref, _ref1, _ref2, _ref3;
      if (!Caman.allowRevert) {
        throw "Revert disabled";
      }
      pixels = [];
      startX = this.cropCoordinates.x;
      endX = startX + this.width;
      startY = this.cropCoordinates.y;
      endY = startY + this.height;
      if (this.resized) {
        canvas = document.createElement('canvas');
        canvas.width = this.originalWidth;
        canvas.height = this.originalHeight;
        ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        pixelData = imageData.data;
        _ref = this.originalPixelData;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          pixel = _ref[i];
          pixelData[i] = pixel;
        }
        ctx.putImageData(imageData, 0, 0);
        scaledCanvas = document.createElement('canvas');
        scaledCanvas.width = this.width;
        scaledCanvas.height = this.height;
        ctx = scaledCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, this.originalWidth, this.originalHeight, 0, 0, this.width, this.height);
        pixelData = ctx.getImageData(0, 0, this.width, this.height).data;
        width = this.width;
      } else {
        pixelData = this.originalPixelData;
        width = this.originalWidth;
      }
      for (i = _j = 0, _ref1 = pixelData.length; _j < _ref1; i = _j += 4) {
        coord = PixelInfo.locationToCoordinates(i, width);
        if (((startX <= (_ref2 = coord.x) && _ref2 < endX)) && ((startY <= (_ref3 = coord.y) && _ref3 < endY))) {
          pixels.push(pixelData[i], pixelData[i + 1], pixelData[i + 2], pixelData[i + 3]);
        }
      }
      return pixels;
    };

    Caman.prototype.process = function(name, processFn) {
      this.renderer.add({
        type: Filter.Type.Single,
        name: name,
        processFn: processFn
      });
      return this;
    };

    Caman.prototype.processKernel = function(name, adjust, divisor, bias) {
      var i, _i, _ref;
      if (!divisor) {
        divisor = 0;
        for (i = _i = 0, _ref = adjust.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          divisor += adjust[i];
        }
      }
      this.renderer.add({
        type: Filter.Type.Kernel,
        name: name,
        adjust: adjust,
        divisor: divisor,
        bias: bias || 0
      });
      return this;
    };

    Caman.prototype.processPlugin = function(plugin, args) {
      this.renderer.add({
        type: Filter.Type.Plugin,
        plugin: plugin,
        args: args
      });
      return this;
    };

    Caman.prototype.newLayer = function(callback) {
      var layer;
      layer = new Layer(this);
      this.canvasQueue.push(layer);
      this.renderer.add({
        type: Filter.Type.LayerDequeue
      });
      callback.call(layer);
      this.renderer.add({
        type: Filter.Type.LayerFinished
      });
      return this;
    };

    Caman.prototype.executeLayer = function(layer) {
      return this.pushContext(layer);
    };

    Caman.prototype.pushContext = function(layer) {
      this.layerStack.push(this.currentLayer);
      this.pixelStack.push(this.pixelData);
      this.currentLayer = layer;
      return this.pixelData = layer.pixelData;
    };

    Caman.prototype.popContext = function() {
      this.pixelData = this.pixelStack.pop();
      return this.currentLayer = this.layerStack.pop();
    };

    Caman.prototype.applyCurrentLayer = function() {
      return this.currentLayer.applyToParent();
    };

    return Caman;

  })();

  Analyze = (function() {

    function Analyze(c) {
      this.c = c;
    }

    Analyze.prototype.calculateLevels = function() {
      var i, levels, numPixels, _i, _j, _k, _ref;
      levels = {
        r: {},
        g: {},
        b: {}
      };
      for (i = _i = 0; _i <= 255; i = ++_i) {
        levels.r[i] = 0;
        levels.g[i] = 0;
        levels.b[i] = 0;
      }
      for (i = _j = 0, _ref = this.c.pixelData.length; _j < _ref; i = _j += 4) {
        levels.r[this.c.pixelData[i]]++;
        levels.g[this.c.pixelData[i + 1]]++;
        levels.b[this.c.pixelData[i + 2]]++;
      }
      numPixels = this.c.pixelData.length / 4;
      for (i = _k = 0; _k <= 255; i = ++_k) {
        levels.r[i] /= numPixels;
        levels.g[i] /= numPixels;
        levels.b[i] /= numPixels;
      }
      return levels;
    };

    return Analyze;

  })();

  Caman.DOMUpdated = function() {
    var img, imgs, parser, _i, _len, _results;
    imgs = document.querySelectorAll("img[data-caman]");
    if (!(imgs.length > 0)) {
      return;
    }
    _results = [];
    for (_i = 0, _len = imgs.length; _i < _len; _i++) {
      img = imgs[_i];
      _results.push(parser = new CamanParser(img, function() {
        this.parse();
        return this.execute();
      }));
    }
    return _results;
  };

  if (Caman.autoload) {
    (function() {
      if (document.readyState === "complete") {
        return Caman.DOMUpdated();
      } else {
        return document.addEventListener("DOMContentLoaded", Caman.DOMUpdated, false);
      }
    })();
  }

  CamanParser = (function() {
    var INST_REGEX;

    INST_REGEX = "(\\w+)\\((.*?)\\)";

    function CamanParser(ele, ready) {
      this.dataStr = ele.getAttribute('data-caman');
      this.caman = Caman(ele, ready.bind(this));
    }

    CamanParser.prototype.parse = function() {
      var args, filter, func, inst, instFunc, m, r, unparsedInstructions, _i, _len, _ref, _results;
      this.ele = this.caman.canvas;
      r = new RegExp(INST_REGEX, 'g');
      unparsedInstructions = this.dataStr.match(r);
      if (!(unparsedInstructions.length > 0)) {
        return;
      }
      r = new RegExp(INST_REGEX);
      _results = [];
      for (_i = 0, _len = unparsedInstructions.length; _i < _len; _i++) {
        inst = unparsedInstructions[_i];
        _ref = inst.match(r), m = _ref[0], filter = _ref[1], args = _ref[2];
        instFunc = new Function("return function() {        this." + filter + "(" + args + ");      };");
        try {
          func = instFunc();
          _results.push(func.call(this.caman));
        } catch (e) {
          _results.push(Log.debug(e));
        }
      }
      return _results;
    };

    CamanParser.prototype.execute = function() {
      var ele;
      ele = this.ele;
      return this.caman.render(function() {
        return ele.parentNode.replaceChild(this.toImage(), ele);
      });
    };

    return CamanParser;

  })();

  Caman.Blender = Blender = (function() {

    function Blender() {}

    Blender.blenders = {};

    Blender.register = function(name, func) {
      return this.blenders[name] = func;
    };

    Blender.execute = function(name, rgbaLayer, rgbaParent) {
      return this.blenders[name](rgbaLayer, rgbaParent);
    };

    return Blender;

  })();

  Caman.Calculate = Calculate = (function() {

    function Calculate() {}

    Calculate.distance = function(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    Calculate.randomRange = function(min, max, getFloat) {
      var rand;
      if (getFloat == null) {
        getFloat = false;
      }
      rand = min + (Math.random() * (max - min));
      if (getFloat) {
        return rand.toFixed(getFloat);
      } else {
        return Math.round(rand);
      }
    };

    Calculate.luminance = function(rgba) {
      return (0.299 * rgba.r) + (0.587 * rgba.g) + (0.114 * rgba.b);
    };

    Calculate.bezier = function(start, ctrl1, ctrl2, end, lowBound, highBound) {
      var Ax, Ay, Bx, By, Cx, Cy, bezier, curveX, curveY, i, j, leftCoord, rightCoord, t, x0, x1, x2, x3, y0, y1, y2, y3, _i, _j, _k, _ref, _ref1;
      x0 = start[0];
      y0 = start[1];
      x1 = ctrl1[0];
      y1 = ctrl1[1];
      x2 = ctrl2[0];
      y2 = ctrl2[1];
      x3 = end[0];
      y3 = end[1];
      bezier = {};
      Cx = parseInt(3 * (x1 - x0), 10);
      Bx = 3 * (x2 - x1) - Cx;
      Ax = x3 - x0 - Cx - Bx;
      Cy = 3 * (y1 - y0);
      By = 3 * (y2 - y1) - Cy;
      Ay = y3 - y0 - Cy - By;
      for (i = _i = 0; _i < 1000; i = ++_i) {
        t = i / 1000;
        curveX = Math.round((Ax * Math.pow(t, 3)) + (Bx * Math.pow(t, 2)) + (Cx * t) + x0);
        curveY = Math.round((Ay * Math.pow(t, 3)) + (By * Math.pow(t, 2)) + (Cy * t) + y0);
        if (lowBound && curveY < lowBound) {
          curveY = lowBound;
        } else if (highBound && curveY > highBound) {
          curveY = highBound;
        }
        bezier[curveX] = curveY;
      }
      if (bezier.length < end[0] + 1) {
        for (i = _j = 0, _ref = end[0]; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
          if (bezier[i] == null) {
            leftCoord = [i - 1, bezier[i - 1]];
            for (j = _k = i, _ref1 = end[0]; i <= _ref1 ? _k <= _ref1 : _k >= _ref1; j = i <= _ref1 ? ++_k : --_k) {
              if (bezier[j] != null) {
                rightCoord = [j, bezier[j]];
                break;
              }
            }
            bezier[i] = leftCoord[1] + ((rightCoord[1] - leftCoord[1]) / (rightCoord[0] - leftCoord[0])) * (i - leftCoord[0]);
          }
        }
      }
      if (bezier[end[0]] == null) {
        bezier[end[0]] = bezier[end[0] - 1];
      }
      return bezier;
    };

    return Calculate;

  })();

  Convert = (function() {

    function Convert() {}

    Convert.hexToRGB = function(hex) {
      var b, g, r;
      if (hex.charAt(0) === "#") {
        hex = hex.substr(1);
      }
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
      return {
        r: r,
        g: g,
        b: b
      };
    };

    Convert.rgbToHSL = function(r, g, b) {
      var d, h, l, max, min, s;
      if (typeof r === "object") {
        g = r.g;
        b = r.b;
        r = r.r;
      }
      r /= 255;
      g /= 255;
      b /= 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = (function() {
          switch (max) {
            case r:
              return (g - b) / d + (g < b ? 6 : 0);
            case g:
              return (b - r) / d + 2;
            case b:
              return (r - g) / d + 4;
          }
        })();
        h /= 6;
      }
      return {
        h: h,
        s: s,
        l: l
      };
    };

    Convert.hslToRGB = function(h, s, l) {
      var b, g, p, q, r;
      if (typeof h === "object") {
        s = h.s;
        l = h.l;
        h = h.h;
      }
      if (s === 0) {
        r = g = b = l;
      } else {
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        r = this.hueToRGB(p, q, h + 1 / 3);
        g = this.hueToRGB(p, q, h);
        b = this.hueToRGB(p, q, h - 1 / 3);
      }
      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    };

    Convert.hueToRGB = function(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };

    Convert.rgbToHSV = function(r, g, b) {
      var d, h, max, min, s, v;
      r /= 255;
      g /= 255;
      b /= 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      v = max;
      d = max - min;
      s = max === 0 ? 0 : d / max;
      if (max === min) {
        h = 0;
      } else {
        h = (function() {
          switch (max) {
            case r:
              return (g - b) / d + (g < b ? 6 : 0);
            case g:
              return (b - r) / d + 2;
            case b:
              return (r - g) / d + 4;
          }
        })();
        h /= 6;
      }
      return {
        h: h,
        s: s,
        v: v
      };
    };

    Convert.hsvToRGB = function(h, s, v) {
      var b, f, g, i, p, q, r, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
      }
      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    };

    Convert.rgbToXYZ = function(r, g, b) {
      var x, y, z;
      r /= 255;
      g /= 255;
      b /= 255;
      if (r > 0.04045) {
        r = Math.pow((r + 0.055) / 1.055, 2.4);
      } else {
        r /= 12.92;
      }
      if (g > 0.04045) {
        g = Math.pow((g + 0.055) / 1.055, 2.4);
      } else {
        g /= 12.92;
      }
      if (b > 0.04045) {
        b = Math.pow((b + 0.055) / 1.055, 2.4);
      } else {
        b /= 12.92;
      }
      x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return {
        x: x * 100,
        y: y * 100,
        z: z * 100
      };
    };

    Convert.xyzToRGB = function(x, y, z) {
      var b, g, r;
      x /= 100;
      y /= 100;
      z /= 100;
      r = (3.2406 * x) + (-1.5372 * y) + (-0.4986 * z);
      g = (-0.9689 * x) + (1.8758 * y) + (0.0415 * z);
      b = (0.0557 * x) + (-0.2040 * y) + (1.0570 * z);
      if (r > 0.0031308) {
        r = (1.055 * Math.pow(r, 0.4166666667)) - 0.055;
      } else {
        r *= 12.92;
      }
      if (g > 0.0031308) {
        g = (1.055 * Math.pow(g, 0.4166666667)) - 0.055;
      } else {
        g *= 12.92;
      }
      if (b > 0.0031308) {
        b = (1.055 * Math.pow(b, 0.4166666667)) - 0.055;
      } else {
        b *= 12.92;
      }
      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    };

    Convert.xyzToLab = function(x, y, z) {
      var a, b, l, whiteX, whiteY, whiteZ;
      if (typeof x === "object") {
        y = x.y;
        z = x.z;
        x = x.x;
      }
      whiteX = 95.047;
      whiteY = 100.0;
      whiteZ = 108.883;
      x /= whiteX;
      y /= whiteY;
      z /= whiteZ;
      if (x > 0.008856451679) {
        x = Math.pow(x, 0.3333333333);
      } else {
        x = (7.787037037 * x) + 0.1379310345;
      }
      if (y > 0.008856451679) {
        y = Math.pow(y, 0.3333333333);
      } else {
        y = (7.787037037 * y) + 0.1379310345;
      }
      if (z > 0.008856451679) {
        z = Math.pow(z, 0.3333333333);
      } else {
        z = (7.787037037 * z) + 0.1379310345;
      }
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return {
        l: l,
        a: a,
        b: b
      };
    };

    Convert.labToXYZ = function(l, a, b) {
      var x, y, z;
      if (typeof l === "object") {
        a = l.a;
        b = l.b;
        l = l.l;
      }
      y = (l + 16) / 116;
      x = y + (a / 500);
      z = y - (b / 200);
      if (x > 0.2068965517) {
        x = x * x * x;
      } else {
        x = 0.1284185493 * (x - 0.1379310345);
      }
      if (y > 0.2068965517) {
        y = y * y * y;
      } else {
        y = 0.1284185493 * (y - 0.1379310345);
      }
      if (z > 0.2068965517) {
        z = z * z * z;
      } else {
        z = 0.1284185493 * (z - 0.1379310345);
      }
      return {
        x: x * 95.047,
        y: y * 100.0,
        z: z * 108.883
      };
    };

    Convert.rgbToLab = function(r, g, b) {
      var xyz;
      if (typeof r === "object") {
        g = r.g;
        b = r.b;
        r = r.r;
      }
      xyz = this.rgbToXYZ(r, g, b);
      return this.xyzToLab(xyz);
    };

    Convert.labToRGB = function(l, a, b) {};

    return Convert;

  })();

  Event = (function() {

    function Event() {}

    Event.events = {};

    Event.types = ["processStart", "processComplete", "renderStart", "renderFinished", "blockStarted", "blockFinished"];

    Event.trigger = function(target, type, data) {
      var event, _i, _len, _ref, _results;
      if (this.events[type] && this.events[type].length) {
        _ref = this.events[type];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          if (event.target === null || target.id === event.target.id) {
            _results.push(event.fn.call(target, data));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    Event.listen = function(target, type, fn) {
      var _fn, _type;
      if (typeof target === "string") {
        _type = target;
        _fn = type;
        target = null;
        type = _type;
        fn = _fn;
      }
      if (__indexOf.call(this.types, type) < 0) {
        return false;
      }
      if (!this.events[type]) {
        this.events[type] = [];
      }
      this.events[type].push({
        target: target,
        fn: fn
      });
      return true;
    };

    return Event;

  })();

  Caman.Event = Event;

  Caman.Filter = Filter = (function() {

    function Filter() {}

    Filter.Type = {
      Single: 1,
      Kernel: 2,
      LayerDequeue: 3,
      LayerFinished: 4,
      LoadOverlay: 5,
      Plugin: 6
    };

    Filter.register = function(name, filterFunc) {
      return Caman.prototype[name] = filterFunc;
    };

    return Filter;

  })();

  Caman.IO = IO = (function() {

    function IO() {}

    IO.domainRegex = /(?:(?:http|https):\/\/)((?:\w+)\.(?:(?:\w|\.)+))/;

    IO.isRemote = function(img) {
      if (img == null) {
        return false;
      }
      if (this.corsEnabled(img)) {
        return false;
      }
      return this.isURLRemote(img.src);
    };

    IO.corsEnabled = function(img) {
      var _ref;
      return (img.crossOrigin != null) && ((_ref = img.crossOrigin.toLowerCase()) === 'anonymous' || _ref === 'use-credentials');
    };

    IO.isURLRemote = function(url) {
      var matches;
      matches = url.match(this.domainRegex);
      if (matches) {
        return matches[1] !== document.domain;
      } else {
        return false;
      }
    };

    IO.remoteCheck = function(src) {
      if (this.isURLRemote(src)) {
        if (!Caman.remoteProxy.length) {
          Log.info("Attempting to load a remote image without a configured proxy. URL: " + src);
        } else {
          if (Caman.isURLRemote(Caman.remoteProxy)) {
            Log.info("Cannot use a remote proxy for loading images.");
            return;
          }
          return "" + Caman.remoteProxy + "?camanProxyUrl=" + (encodeURIComponent(src));
        }
      }
    };

    IO.proxyUrl = function(src) {
      return "" + Caman.remoteProxy + "?" + Caman.proxyParam + "=" + (encodeURIComponent(src));
    };

    IO.useProxy = function(lang) {
      var langToExt;
      langToExt = {
        ruby: 'rb',
        python: 'py',
        perl: 'pl',
        javascript: 'js'
      };
      lang = lang.toLowerCase();
      if (langToExt[lang] != null) {
        lang = langToExt[lang];
      }
      return "proxies/caman_proxy." + lang;
    };

    return IO;

  })();

  Caman.prototype.save = function() {
    if (typeof exports !== "undefined" && exports !== null) {
      return this.nodeSave.apply(this, arguments);
    } else {
      return this.browserSave.apply(this, arguments);
    }
  };

  Caman.prototype.browserSave = function(type) {
    var image;
    if (type == null) {
      type = "png";
    }
    type = type.toLowerCase();
    image = this.toBase64(type).replace("image/" + type, "image/octet-stream");
    return document.location.href = image;
  };

  Caman.prototype.nodeSave = function(file, overwrite) {
    var stats;
    if (overwrite == null) {
      overwrite = true;
    }
    try {
      stats = fs.statSync(file);
      if (stats.isFile() && !overwrite) {
        return false;
      }
    } catch (e) {
      Log.debug("Creating output file " + file);
    }
    return fs.writeFile(file, this.canvas.toBuffer(), function() {
      return Log.debug("Finished writing to " + file);
    });
  };

  Caman.prototype.toImage = function(type) {
    var img;
    img = document.createElement('img');
    img.src = this.toBase64(type);
    img.width = this.dimensions.width;
    img.height = this.dimensions.height;
    if (window.devicePixelRatio) {
      img.width /= window.devicePixelRatio;
      img.height /= window.devicePixelRatio;
    }
    return img;
  };

  Caman.prototype.toBase64 = function(type) {
    if (type == null) {
      type = "png";
    }
    type = type.toLowerCase();
    return this.canvas.toDataURL("image/" + type);
  };

  Layer = (function() {

    function Layer(c) {
      this.c = c;
      this.filter = this.c;
      this.options = {
        blendingMode: 'normal',
        opacity: 1.0
      };
      this.layerID = Util.uniqid.get();
      this.canvas = typeof exports !== "undefined" && exports !== null ? new Canvas() : document.createElement('canvas');
      this.canvas.width = this.c.dimensions.width;
      this.canvas.height = this.c.dimensions.height;
      this.context = this.canvas.getContext('2d');
      this.context.createImageData(this.canvas.width, this.canvas.height);
      this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.pixelData = this.imageData.data;
    }

    Layer.prototype.newLayer = function(cb) {
      return this.c.newLayer.call(this.c, cb);
    };

    Layer.prototype.setBlendingMode = function(mode) {
      this.options.blendingMode = mode;
      return this;
    };

    Layer.prototype.opacity = function(opacity) {
      this.options.opacity = opacity / 100;
      return this;
    };

    Layer.prototype.copyParent = function() {
      var i, parentData, _i, _ref;
      parentData = this.c.pixelData;
      for (i = _i = 0, _ref = this.c.pixelData.length; _i < _ref; i = _i += 4) {
        this.pixelData[i] = parentData[i];
        this.pixelData[i + 1] = parentData[i + 1];
        this.pixelData[i + 2] = parentData[i + 2];
        this.pixelData[i + 3] = parentData[i + 3];
      }
      return this;
    };

    Layer.prototype.fillColor = function() {
      return this.c.fillColor.apply(this.c, arguments);
    };

    Layer.prototype.overlayImage = function(image) {
      if (typeof image === "object") {
        image = image.src;
      } else if (typeof image === "string" && image[0] === "#") {
        image = $(image).src;
      }
      if (!image) {
        return this;
      }
      this.c.renderer.renderQueue.push({
        type: Filter.Type.LoadOverlay,
        src: image,
        layer: this
      });
      return this;
    };

    Layer.prototype.applyToParent = function() {
      var i, layerData, parentData, result, rgbaLayer, rgbaParent, _i, _ref, _results;
      parentData = this.c.pixelStack[this.c.pixelStack.length - 1];
      layerData = this.c.pixelData;
      _results = [];
      for (i = _i = 0, _ref = layerData.length; _i < _ref; i = _i += 4) {
        rgbaParent = {
          r: parentData[i],
          g: parentData[i + 1],
          b: parentData[i + 2],
          a: parentData[i + 3]
        };
        rgbaLayer = {
          r: layerData[i],
          g: layerData[i + 1],
          b: layerData[i + 2],
          a: layerData[i + 3]
        };
        result = Blender.execute(this.options.blendingMode, rgbaLayer, rgbaParent);
        result.r = Util.clampRGB(result.r);
        result.g = Util.clampRGB(result.g);
        result.b = Util.clampRGB(result.b);
        if (result.a == null) {
          result.a = rgbaLayer.a;
        }
        parentData[i] = rgbaParent.r - ((rgbaParent.r - result.r) * (this.options.opacity * (result.a / 255)));
        parentData[i + 1] = rgbaParent.g - ((rgbaParent.g - result.g) * (this.options.opacity * (result.a / 255)));
        _results.push(parentData[i + 2] = rgbaParent.b - ((rgbaParent.b - result.b) * (this.options.opacity * (result.a / 255))));
      }
      return _results;
    };

    return Layer;

  })();

  Logger = (function() {

    function Logger() {
      var name, _i, _len, _ref;
      _ref = ['log', 'info', 'warn', 'error'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        this[name] = (function(name) {
          return function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (!Caman.DEBUG) {
              return;
            }
            try {
              return console[name].apply(console, args);
            } catch (e) {
              return console[name](args);
            }
          };
        })(name);
      }
      this.debug = this.log;
    }

    return Logger;

  })();

  Log = new Logger();

  PixelInfo = (function() {

    PixelInfo.coordinatesToLocation = function(x, y, width) {
      return (y * width + x) * 4;
    };

    PixelInfo.locationToCoordinates = function(loc, width) {
      var x, y;
      y = Math.floor(loc / (width * 4));
      x = (loc % (width * 4)) / 4;
      return {
        x: x,
        y: y
      };
    };

    function PixelInfo(c) {
      this.c = c;
      this.loc = 0;
    }

    PixelInfo.prototype.locationXY = function() {
      var x, y;
      y = this.c.dimensions.height - Math.floor(this.loc / (this.c.dimensions.width * 4));
      x = (this.loc % (this.c.dimensions.width * 4)) / 4;
      return {
        x: x,
        y: y
      };
    };

    PixelInfo.prototype.getPixelRelative = function(horiz, vert) {
      var newLoc;
      newLoc = this.loc + (this.c.dimensions.width * 4 * (vert * -1)) + (4 * horiz);
      if (newLoc > this.c.pixelData.length || newLoc < 0) {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 0
        };
      }
      return {
        r: this.c.pixelData[newLoc],
        g: this.c.pixelData[newLoc + 1],
        b: this.c.pixelData[newLoc + 2],
        a: this.c.pixelData[newLoc + 3]
      };
    };

    PixelInfo.prototype.putPixelRelative = function(horiz, vert, rgba) {
      var nowLoc;
      nowLoc = this.loc + (this.c.dimensions.width * 4 * (vert * -1)) + (4 * horiz);
      if (newLoc > this.c.pixelData.length || newLoc < 0) {
        return;
      }
      this.c.pixelData[newLoc] = rgba.r;
      this.c.pixelData[newLoc + 1] = rgba.g;
      this.c.pixelData[newLoc + 2] = rgba.b;
      this.c.pixelData[newLoc + 3] = rgba.a;
      return true;
    };

    PixelInfo.prototype.getPixel = function(x, y) {
      var loc;
      loc = this.coordinatesToLocation(x, y, this.width);
      return {
        r: this.c.pixelData[loc],
        g: this.c.pixelData[loc + 1],
        b: this.c.pixelData[loc + 2],
        a: this.c.pixelData[loc + 3]
      };
    };

    PixelInfo.prototype.putPixel = function(x, y, rgba) {
      var loc;
      loc = this.coordinatesToLocation(x, y, this.width);
      this.c.pixelData[loc] = rgba.r;
      this.c.pixelData[loc + 1] = rgba.g;
      this.c.pixelData[loc + 2] = rgba.b;
      return this.c.pixelData[loc + 3] = rgba.a;
    };

    return PixelInfo;

  })();

  Plugin = (function() {

    function Plugin() {}

    Plugin.plugins = {};

    Plugin.register = function(name, plugin) {
      return this.plugins[name] = plugin;
    };

    Plugin.execute = function(context, name, args) {
      return this.plugins[name].apply(context, args);
    };

    return Plugin;

  })();

  Caman.Plugin = Plugin;

  Caman.Renderer = Renderer = (function() {

    Renderer.Blocks = Caman.NodeJS ? require('os').cpus().length : 4;

    function Renderer(c) {
      var _this = this;
      this.c = c;
      this.processNext = function() {
        return Renderer.prototype.processNext.apply(_this, arguments);
      };
      this.renderQueue = [];
      this.modPixelData = null;
    }

    Renderer.prototype.add = function(job) {
      if (job == null) {
        return;
      }
      return this.renderQueue.push(job);
    };

    Renderer.prototype.processNext = function() {
      var layer;
      if (this.renderQueue.length === 0) {
        Event.trigger(this, "renderFinished");
        if (this.finishedFn != null) {
          this.finishedFn.call(this.c);
        }
        return this;
      }
      this.currentJob = this.renderQueue.shift();
      switch (this.currentJob.type) {
        case Filter.Type.LayerDequeue:
          layer = this.c.canvasQueue.shift();
          this.c.executeLayer(layer);
          return this.processNext();
        case Filter.Type.LayerFinished:
          this.c.applyCurrentLayer();
          this.c.popContext();
          return this.processNext();
        case Filter.Type.LoadOverlay:
          return this.loadOverlay(this.currentJob.layer, this.currentJob.src);
        case Filter.Type.Plugin:
          return this.executePlugin();
        default:
          return this.executeFilter();
      }
    };

    Renderer.prototype.execute = function(callback) {
      this.finishedFn = callback;
      this.modPixelData = Util.dataArray(this.c.pixelData.length);
      return this.processNext();
    };

    Renderer.prototype.eachBlock = function(fn) {
      var blockN, blockPixelLength, bnum, end, f, i, lastBlockN, n, start, _i, _ref, _results,
        _this = this;
      this.blocksDone = 0;
      n = this.c.pixelData.length;
      blockPixelLength = Math.floor((n / 4) / Renderer.Blocks);
      blockN = blockPixelLength * 4;
      lastBlockN = blockN + ((n / 4) % Renderer.Blocks) * 4;
      _results = [];
      for (i = _i = 0, _ref = Renderer.Blocks; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        start = i * blockN;
        end = start + (i === Renderer.Blocks - 1 ? lastBlockN : blockN);
        if (Caman.NodeJS) {
          f = Fiber(function() {
            return fn.call(_this, i, start, end);
          });
          bnum = f.run();
          _results.push(this.blockFinished(bnum));
        } else {
          _results.push(setTimeout((function(i, start, end) {
            return function() {
              return fn.call(_this, i, start, end);
            };
          })(i, start, end), 0));
        }
      }
      return _results;
    };

    Renderer.prototype.executeFilter = function() {
      Event.trigger(this.c, "processStart", this.currentJob);
      if (this.currentJob.type === Filter.Type.Single) {
        return this.eachBlock(this.renderBlock);
      } else {
        return this.eachBlock(this.renderKernel);
      }
    };

    Renderer.prototype.executePlugin = function() {
      Log.debug("Executing plugin " + this.currentJob.plugin);
      Plugin.execute(this.c, this.currentJob.plugin, this.currentJob.args);
      Log.debug("Plugin " + this.currentJob.plugin + " finished!");
      return this.processNext();
    };

    Renderer.prototype.renderBlock = function(bnum, start, end) {
      var data, i, pixelInfo, res, _i;
      Log.debug("Block #" + bnum + " - Filter: " + this.currentJob.name + ", Start: " + start + ", End: " + end);
      Event.trigger(this.c, "blockStarted", {
        blockNum: bnum,
        totalBlocks: Renderer.Blocks,
        startPixel: start,
        endPixel: end
      });
      data = {
        r: 0,
        g: 0,
        b: 0,
        a: 0
      };
      pixelInfo = new PixelInfo(this.c);
      for (i = _i = start; _i < end; i = _i += 4) {
        pixelInfo.loc = i;
        data.r = this.c.pixelData[i];
        data.g = this.c.pixelData[i + 1];
        data.b = this.c.pixelData[i + 2];
        data.a = this.c.pixelData[i + 3];
        res = this.currentJob.processFn.call(pixelInfo, data);
        if (res.a == null) {
          res.a = data.a;
        }
        this.c.pixelData[i] = Util.clampRGB(res.r);
        this.c.pixelData[i + 1] = Util.clampRGB(res.g);
        this.c.pixelData[i + 2] = Util.clampRGB(res.b);
        this.c.pixelData[i + 3] = Util.clampRGB(res.a);
      }
      if (Caman.NodeJS) {
        return Fiber["yield"](bnum);
      } else {
        return this.blockFinished(bnum);
      }
    };

    Renderer.prototype.renderKernel = function(bnum, start, end) {
      var adjust, adjustSize, bias, builder, builderIndex, divisor, i, j, k, kernel, n, name, pixel, pixelInfo, res, _i, _j, _k;
      name = this.currentJob.name;
      bias = this.currentJob.bias;
      divisor = this.currentJob.divisor;
      n = this.c.pixelData.length;
      adjust = this.currentJob.adjust;
      adjustSize = Math.sqrt(adjust.length);
      kernel = [];
      Log.debug("Rendering kernel - Filter: " + this.currentJob.name);
      start = Math.max(start, this.c.dimensions.width * 4 * ((adjustSize - 1) / 2));
      end = Math.min(end, n - (this.c.dimensions.width * 4 * ((adjustSize - 1) / 2)));
      builder = (adjustSize - 1) / 2;
      pixelInfo = new PixelInfo(this.c);
      for (i = _i = start; _i < end; i = _i += 4) {
        pixelInfo.loc = i;
        builderIndex = 0;
        for (j = _j = -builder; -builder <= builder ? _j <= builder : _j >= builder; j = -builder <= builder ? ++_j : --_j) {
          for (k = _k = builder; builder <= -builder ? _k <= -builder : _k >= -builder; k = builder <= -builder ? ++_k : --_k) {
            pixel = pixelInfo.getPixelRelative(j, k);
            kernel[builderIndex * 3] = pixel.r;
            kernel[builderIndex * 3 + 1] = pixel.g;
            kernel[builderIndex * 3 + 2] = pixel.b;
            builderIndex++;
          }
        }
        res = this.processKernel(adjust, kernel, divisor, bias);
        this.modPixelData[i] = Util.clampRGB(res.r);
        this.modPixelData[i + 1] = Util.clampRGB(res.g);
        this.modPixelData[i + 2] = Util.clampRGB(res.b);
        this.modPixelData[i + 3] = this.c.pixelData[i + 3];
      }
      if (Caman.NodeJS) {
        return Fiber["yield"](bnum);
      } else {
        return this.blockFinished(bnum);
      }
    };

    Renderer.prototype.blockFinished = function(bnum) {
      var i, _i, _ref;
      if (bnum >= 0) {
        Log.debug("Block #" + bnum + " finished! Filter: " + this.currentJob.name);
      }
      this.blocksDone++;
      Event.trigger(this.c, "blockFinished", {
        blockNum: bnum,
        blocksFinished: this.blocksDone,
        totalBlocks: Renderer.Blocks
      });
      if (this.blocksDone === Renderer.Blocks) {
        if (this.currentJob.type === Filter.Type.Kernel) {
          for (i = _i = 0, _ref = this.c.pixelData.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            this.c.pixelData[i] = this.modPixelData[i];
          }
        }
        if (bnum >= 0) {
          Log.debug("Filter " + this.currentJob.name + " finished!");
        }
        Event.trigger(this.c, "processComplete", this.currentJob);
        return this.processNext();
      }
    };

    Renderer.prototype.processKernel = function(adjust, kernel, divisor, bias) {
      var i, val, _i, _ref;
      val = {
        r: 0,
        g: 0,
        b: 0
      };
      for (i = _i = 0, _ref = adjust.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        val.r += adjust[i] * kernel[i * 3];
        val.g += adjust[i] * kernel[i * 3 + 1];
        val.b += adjust[i] * kernel[i * 3 + 2];
      }
      val.r = (val.r / divisor) + bias;
      val.g = (val.g / divisor) + bias;
      val.b = (val.b / divisor) + bias;
      return val;
    };

    Renderer.prototype.loadOverlay = function(layer, src) {
      var img, proxyUrl,
        _this = this;
      img = document.createElement('img');
      img.onload = function() {
        layer.context.drawImage(img, 0, 0, _this.c.dimensions.width, _this.c.dimensions.height);
        layer.imageData = layer.context.getImageData(0, 0, _this.c.dimensions.width, _this.c.dimensions.height);
        layer.pixelData = layer.imageData.data;
        _this.c.pixelData = layer.pixelData;
        return _this.processNext();
      };
      proxyUrl = IO.remoteCheck(src);
      return img.src = proxyUrl != null ? proxyUrl : src;
    };

    return Renderer;

  })();

  Caman.Store = Store = (function() {

    function Store() {}

    Store.items = {};

    Store.has = function(search) {
      return this.items[search] != null;
    };

    Store.get = function(search) {
      return this.items[search];
    };

    Store.put = function(name, obj) {
      return this.items[name] = obj;
    };

    Store.execute = function(search, callback) {
      var _this = this;
      setTimeout(function() {
        return callback.call(_this.get(search), _this.get(search));
      }, 0);
      return this.get(search);
    };

    Store.flush = function(name) {
      if (name == null) {
        name = false;
      }
      if (name) {
        return delete this.items[name];
      } else {
        return this.items = {};
      }
    };

    return Store;

  })();

  Blender.register("normal", function(rgbaLayer, rgbaParent) {
    return {
      r: rgbaLayer.r,
      g: rgbaLayer.g,
      b: rgbaLayer.b
    };
  });

  Blender.register("multiply", function(rgbaLayer, rgbaParent) {
    return {
      r: (rgbaLayer.r * rgbaParent.r) / 255,
      g: (rgbaLayer.g * rgbaParent.g) / 255,
      b: (rgbaLayer.b * rgbaParent.b) / 255
    };
  });

  Blender.register("screen", function(rgbaLayer, rgbaParent) {
    return {
      r: 255 - (((255 - rgbaLayer.r) * (255 - rgbaParent.r)) / 255),
      g: 255 - (((255 - rgbaLayer.g) * (255 - rgbaParent.g)) / 255),
      b: 255 - (((255 - rgbaLayer.b) * (255 - rgbaParent.b)) / 255)
    };
  });

  Blender.register("overlay", function(rgbaLayer, rgbaParent) {
    var result;
    result = {};
    result.r = rgbaParent.r > 128 ? 255 - 2 * (255 - rgbaLayer.r) * (255 - rgbaParent.r) / 255 : (rgbaParent.r * rgbaLayer.r * 2) / 255;
    result.g = rgbaParent.g > 128 ? 255 - 2 * (255 - rgbaLayer.g) * (255 - rgbaParent.g) / 255 : (rgbaParent.g * rgbaLayer.g * 2) / 255;
    result.b = rgbaParent.b > 128 ? 255 - 2 * (255 - rgbaLayer.b) * (255 - rgbaParent.b) / 255 : (rgbaParent.b * rgbaLayer.b * 2) / 255;
    return result;
  });

  Blender.register("difference", function(rgbaLayer, rgbaParent) {
    return {
      r: rgbaLayer.r - rgbaParent.r,
      g: rgbaLayer.g - rgbaParent.g,
      b: rgbaLayer.b - rgbaParent.b
    };
  });

  Blender.register("addition", function(rgbaLayer, rgbaParent) {
    return {
      r: rgbaParent.r + rgbaLayer.r,
      g: rgbaParent.g + rgbaLayer.g,
      b: rgbaParent.b + rgbaLayer.b
    };
  });

  Blender.register("exclusion", function(rgbaLayer, rgbaParent) {
    return {
      r: 128 - 2 * (rgbaParent.r - 128) * (rgbaLayer.r - 128) / 255,
      g: 128 - 2 * (rgbaParent.g - 128) * (rgbaLayer.g - 128) / 255,
      b: 128 - 2 * (rgbaParent.b - 128) * (rgbaLayer.b - 128) / 255
    };
  });

  Blender.register("softLight", function(rgbaLayer, rgbaParent) {
    var result;
    result = {};
    result.r = rgbaParent.r > 128 ? 255 - ((255 - rgbaParent.r) * (255 - (rgbaLayer.r - 128))) / 255 : (rgbaParent.r * (rgbaLayer.r + 128)) / 255;
    result.g = rgbaParent.g > 128 ? 255 - ((255 - rgbaParent.g) * (255 - (rgbaLayer.g - 128))) / 255 : (rgbaParent.g * (rgbaLayer.g + 128)) / 255;
    result.b = rgbaParent.b > 128 ? 255 - ((255 - rgbaParent.b) * (255 - (rgbaLayer.b - 128))) / 255 : (rgbaParent.b * (rgbaLayer.b + 128)) / 255;
    return result;
  });

  Blender.register("lighten", function(rgbaLayer, rgbaParent) {
    return {
      r: rgbaParent.r > rgbaLayer.r ? rgbaParent.r : rgbaLayer.r,
      g: rgbaParent.g > rgbaLayer.g ? rgbaParent.g : rgbaLayer.g,
      b: rgbaParent.b > rgbaLayer.b ? rgbaParent.b : rgbaLayer.b
    };
  });

  Blender.register("darken", function(rgbaLayer, rgbaParent) {
    return {
      r: rgbaParent.r > rgbaLayer.r ? rgbaLayer.r : rgbaParent.r,
      g: rgbaParent.g > rgbaLayer.g ? rgbaLayer.g : rgbaParent.g,
      b: rgbaParent.b > rgbaLayer.b ? rgbaLayer.b : rgbaParent.b
    };
  });

  Filter.register("fillColor", function() {
    var color;
    if (arguments.length === 1) {
      color = Convert.hexToRGB(arguments[0]);
    } else {
      color = {
        r: arguments[0],
        g: arguments[1],
        b: arguments[2]
      };
    }
    return this.process("fillColor", function(rgba) {
      rgba.r = color.r;
      rgba.g = color.g;
      rgba.b = color.b;
      rgba.a = 255;
      return rgba;
    });
  });

  Filter.register("brightness", function(adjust) {
    adjust = Math.floor(255 * (adjust / 100));
    return this.process("brightness", function(rgba) {
      rgba.r += adjust;
      rgba.g += adjust;
      rgba.b += adjust;
      return rgba;
    });
  });

  Filter.register("saturation", function(adjust) {
    adjust *= -0.01;
    return this.process("saturation", function(rgba) {
      var max;
      max = Math.max(rgba.r, rgba.g, rgba.b);
      if (rgba.r !== max) {
        rgba.r += (max - rgba.r) * adjust;
      }
      if (rgba.g !== max) {
        rgba.g += (max - rgba.g) * adjust;
      }
      if (rgba.b !== max) {
        rgba.b += (max - rgba.b) * adjust;
      }
      return rgba;
    });
  });

  Filter.register("vibrance", function(adjust) {
    adjust *= -1;
    return this.process("vibrance", function(rgba) {
      var amt, avg, max;
      max = Math.max(rgba.r, rgba.g, rgba.b);
      avg = (rgba.r + rgba.g + rgba.b) / 3;
      amt = ((Math.abs(max - avg) * 2 / 255) * adjust) / 100;
      if (rgba.r !== max) {
        rgba.r += (max - rgba.r) * amt;
      }
      if (rgba.g !== max) {
        rgba.g += (max - rgba.g) * amt;
      }
      if (rgba.b !== max) {
        rgba.b += (max - rgba.b) * amt;
      }
      return rgba;
    });
  });

  Filter.register("greyscale", function(adjust) {
    return this.process("greyscale", function(rgba) {
      var avg;
      avg = Calculate.luminance(rgba);
      rgba.r = avg;
      rgba.g = avg;
      rgba.b = avg;
      return rgba;
    });
  });

  Filter.register("contrast", function(adjust) {
    adjust = Math.pow((adjust + 100) / 100, 2);
    return this.process("contrast", function(rgba) {
      rgba.r /= 255;
      rgba.r -= 0.5;
      rgba.r *= adjust;
      rgba.r += 0.5;
      rgba.r *= 255;
      rgba.g /= 255;
      rgba.g -= 0.5;
      rgba.g *= adjust;
      rgba.g += 0.5;
      rgba.g *= 255;
      rgba.b /= 255;
      rgba.b -= 0.5;
      rgba.b *= adjust;
      rgba.b += 0.5;
      rgba.b *= 255;
      return rgba;
    });
  });

  Filter.register("hue", function(adjust) {
    return this.process("hue", function(rgba) {
      var h, hsv, rgb;
      hsv = Convert.rgbToHSV(rgba.r, rgba.g, rgba.b);
      h = hsv.h * 100;
      h += Math.abs(adjust);
      h = h % 100;
      h /= 100;
      hsv.h = h;
      rgb = Convert.hsvToRGB(hsv.h, hsv.s, hsv.v);
      rgb.a = rgba.a;
      return rgb;
    });
  });

  Filter.register("colorize", function() {
    var level, rgb;
    if (arguments.length === 2) {
      rgb = Convert.hexToRGB(arguments[0]);
      level = arguments[1];
    } else if (arguments.length === 4) {
      rgb = {
        r: arguments[0],
        g: arguments[1],
        b: arguments[2]
      };
      level = arguments[3];
    }
    return this.process("colorize", function(rgba) {
      rgba.r -= (rgba.r - rgb.r) * (level / 100);
      rgba.g -= (rgba.g - rgb.g) * (level / 100);
      rgba.b -= (rgba.b - rgb.b) * (level / 100);
      return rgba;
    });
  });

  Filter.register("invert", function() {
    return this.process("invert", function(rgba) {
      rgba.r = 255 - rgba.r;
      rgba.g = 255 - rgba.g;
      rgba.b = 255 - rgba.b;
      return rgba;
    });
  });

  Filter.register("sepia", function(adjust) {
    if (adjust == null) {
      adjust = 100;
    }
    adjust /= 100;
    return this.process("sepia", function(rgba) {
      rgba.r = Math.min(255, (rgba.r * (1 - (0.607 * adjust))) + (rgba.g * (0.769 * adjust)) + (rgba.b * (0.189 * adjust)));
      rgba.g = Math.min(255, (rgba.r * (0.349 * adjust)) + (rgba.g * (1 - (0.314 * adjust))) + (rgba.b * (0.168 * adjust)));
      rgba.b = Math.min(255, (rgba.r * (0.272 * adjust)) + (rgba.g * (0.534 * adjust)) + (rgba.b * (1 - (0.869 * adjust))));
      return rgba;
    });
  });

  Filter.register("gamma", function(adjust) {
    return this.process("gamma", function(rgba) {
      rgba.r = Math.pow(rgba.r / 255, adjust) * 255;
      rgba.g = Math.pow(rgba.g / 255, adjust) * 255;
      rgba.b = Math.pow(rgba.b / 255, adjust) * 255;
      return rgba;
    });
  });

  Filter.register("noise", function(adjust) {
    adjust = Math.abs(adjust) * 2.55;
    return this.process("noise", function(rgba) {
      var rand;
      rand = Calculate.randomRange(adjust * -1, adjust);
      rgba.r += rand;
      rgba.g += rand;
      rgba.b += rand;
      return rgba;
    });
  });

  Filter.register("clip", function(adjust) {
    adjust = Math.abs(adjust) * 2.55;
    return this.process("clip", function(rgba) {
      if (rgba.r > 255 - adjust) {
        rgba.r = 255;
      } else if (rgba.r < adjust) {
        rgba.r = 0;
      }
      if (rgba.g > 255 - adjust) {
        rgba.g = 255;
      } else if (rgba.g < adjust) {
        rgba.g = 0;
      }
      if (rgba.b > 255 - adjust) {
        rgba.b = 255;
      } else if (rgba.b < adjust) {
        rgba.b = 0;
      }
      return rgba;
    });
  });

  Filter.register("channels", function(options) {
    var chan, value;
    if (typeof options !== "object") {
      return this;
    }
    for (chan in options) {
      if (!__hasProp.call(options, chan)) continue;
      value = options[chan];
      if (value === 0) {
        delete options[chan];
        continue;
      }
      options[chan] /= 100;
    }
    if (options.length === 0) {
      return this;
    }
    return this.process("channels", function(rgba) {
      if (options.red != null) {
        if (options.red > 0) {
          rgba.r += (255 - rgba.r) * options.red;
        } else {
          rgba.r -= rgba.r * Math.abs(options.red);
        }
      }
      if (options.green != null) {
        if (options.green > 0) {
          rgba.g += (255 - rgba.g) * options.green;
        } else {
          rgba.g -= rgba.g * Math.abs(options.green);
        }
      }
      if (options.blue != null) {
        if (options.blue > 0) {
          rgba.b += (255 - rgba.b) * options.blue;
        } else {
          rgba.b -= rgba.b * Math.abs(options.blue);
        }
      }
      return rgba;
    });
  });

  Filter.register("curves", function() {
    var bezier, chans, cps, ctrl1, ctrl2, end, i, start, _i, _j, _ref, _ref1;
    chans = arguments[0], cps = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (typeof chans === "string") {
      chans = chans.split("");
    }
    if (chans[0] === "v") {
      chans = ['r', 'g', 'b'];
    }
    if (cps.length < 3 || cps.length > 4) {
      throw "Invalid number of arguments to curves filter";
    }
    start = cps[0];
    ctrl1 = cps[1];
    ctrl2 = cps.length === 4 ? cps[2] : cps[1];
    end = cps[cps.length - 1];
    bezier = Calculate.bezier(start, ctrl1, ctrl2, end, 0, 255);
    if (start[0] > 0) {
      for (i = _i = 0, _ref = start[0]; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        bezier[i] = start[1];
      }
    }
    if (end[0] < 255) {
      for (i = _j = _ref1 = end[0]; _ref1 <= 255 ? _j <= 255 : _j >= 255; i = _ref1 <= 255 ? ++_j : --_j) {
        bezier[i] = end[1];
      }
    }
    return this.process("curves", function(rgba) {
      var _k, _ref2;
      for (i = _k = 0, _ref2 = chans.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        rgba[chans[i]] = bezier[rgba[chans[i]]];
      }
      return rgba;
    });
  });

  Filter.register("exposure", function(adjust) {
    var ctrl1, ctrl2, p;
    p = Math.abs(adjust) / 100;
    ctrl1 = [0, 255 * p];
    ctrl2 = [255 - (255 * p), 255];
    if (adjust < 0) {
      ctrl1 = ctrl1.reverse();
      ctrl2 = ctrl2.reverse();
    }
    return this.curves('rgb', [0, 0], ctrl1, ctrl2, [255, 255]);
  });

  Caman.Plugin.register("crop", function(width, height, x, y) {
    var canvas, ctx;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (typeof exports !== "undefined" && exports !== null) {
      canvas = new Canvas(width, height);
    } else {
      canvas = document.createElement('canvas');
      Util.copyAttributes(this.canvas, canvas);
      canvas.width = width;
      canvas.height = height;
    }
    ctx = canvas.getContext('2d');
    ctx.drawImage(this.canvas, x, y, width, height, 0, 0, width, height);
    this.cropCoordinates = {
      x: x,
      y: y
    };
    this.cropped = true;
    return this.replaceCanvas(canvas);
  });

  Caman.Plugin.register("resize", function(newDims) {
    var canvas, ctx;
    if (newDims == null) {
      newDims = null;
    }
    if (newDims === null || ((newDims.width == null) && (newDims.height == null))) {
      Log.error("Invalid or missing dimensions given for resize");
      return;
    }
    if (newDims.width == null) {
      newDims.width = this.canvas.width * newDims.height / this.canvas.height;
    } else if (newDims.height == null) {
      newDims.height = this.canvas.height * newDims.width / this.canvas.width;
    }
    if (typeof exports !== "undefined" && exports !== null) {
      canvas = new Canvas(newDims.width, newDims.height);
    } else {
      canvas = document.createElement('canvas');
      Util.copyAttributes(this.canvas, canvas);
      canvas.width = newDims.width;
      canvas.height = newDims.height;
    }
    ctx = canvas.getContext('2d');
    ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, newDims.width, newDims.height);
    this.resized = true;
    return this.replaceCanvas(canvas);
  });

  Caman.Filter.register("crop", function() {
    return this.processPlugin("crop", Array.prototype.slice.call(arguments, 0));
  });

  Caman.Filter.register("resize", function() {
    return this.processPlugin("resize", Array.prototype.slice.call(arguments, 0));
  });

  Caman.Filter.register("boxBlur", function() {
    return this.processKernel("Box Blur", [1, 1, 1, 1, 1, 1, 1, 1, 1]);
  });

  Caman.Filter.register("heavyRadialBlur", function() {
    return this.processKernel("Heavy Radial Blur", [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0]);
  });

  Caman.Filter.register("gaussianBlur", function() {
    return this.processKernel("Gaussian Blur", [1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1]);
  });

  Caman.Filter.register("motionBlur", function(degrees) {
    var kernel;
    if (degrees === 0 || degrees === 180) {
      kernel = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0];
    } else if ((degrees > 0 && degrees < 90) || (degrees > 180 && degrees < 270)) {
      kernel = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
    } else if (degrees === 90 || degrees === 270) {
      kernel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else {
      kernel = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
    }
    return this.processKernel("Motion Blur", kernel);
  });

  Caman.Filter.register("sharpen", function(amt) {
    if (amt == null) {
      amt = 100;
    }
    amt /= 100;
    return this.processKernel("Sharpen", [0, -amt, 0, -amt, 4 * amt + 1, -amt, 0, -amt, 0]);
  });

  vignetteFilters = {
    brightness: function(rgba, amt, opts) {
      rgba.r = rgba.r - (rgba.r * amt * opts.strength);
      rgba.g = rgba.g - (rgba.g * amt * opts.strength);
      rgba.b = rgba.b - (rgba.b * amt * opts.strength);
      return rgba;
    },
    gamma: function(rgba, amt, opts) {
      rgba.r = Math.pow(rgba.r / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
      rgba.g = Math.pow(rgba.g / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
      rgba.b = Math.pow(rgba.b / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
      return rgba;
    },
    colorize: function(rgba, amt, opts) {
      rgba.r -= (rgba.r - opts.color.r) * amt;
      rgba.g -= (rgba.g - opts.color.g) * amt;
      rgba.b -= (rgba.b - opts.color.b) * amt;
      return rgba;
    }
  };

  Filter.register("vignette", function(size, strength) {
    var bezier, center, end, start;
    if (strength == null) {
      strength = 60;
    }
    if (typeof size === "string" && size.substr(-1) === "%") {
      if (this.dimensions.height > this.dimensions.width) {
        size = this.dimensions.width * (parseInt(size.substr(0, size.length - 1), 10) / 100);
      } else {
        size = this.dimensions.height * (parseInt(size.substr(0, size.length - 1), 10) / 100);
      }
    }
    strength /= 100;
    center = [this.dimensions.width / 2, this.dimensions.height / 2];
    start = Math.sqrt(Math.pow(center[0], 2) + Math.pow(center[1], 2));
    end = start - size;
    bezier = Calculate.bezier([0, 1], [30, 30], [70, 60], [100, 80]);
    return this.process("vignette", function(rgba) {
      var dist, div, loc;
      loc = this.locationXY();
      dist = Calculate.distance(loc.x, loc.y, center[0], center[1]);
      if (dist > end) {
        div = Math.max(1, (bezier[Math.round(((dist - end) / size) * 100)] / 10) * strength);
        rgba.r = Math.pow(rgba.r / 255, div) * 255;
        rgba.g = Math.pow(rgba.g / 255, div) * 255;
        rgba.b = Math.pow(rgba.b / 255, div) * 255;
      }
      return rgba;
    });
  });

  Filter.register("rectangularVignette", function(opts) {
    var defaults, dim, percent, size, _i, _len, _ref;
    defaults = {
      strength: 50,
      cornerRadius: 0,
      method: 'brightness',
      color: {
        r: 0,
        g: 0,
        b: 0
      }
    };
    opts = Util.extend(defaults, opts);
    if (!opts.size) {
      return this;
    } else if (typeof opts.size === "string") {
      percent = parseInt(opts.size, 10) / 100;
      opts.size = {
        width: this.dimensions.width * percent,
        height: this.dimensions.height * percent
      };
    } else if (typeof opts.size === "object") {
      _ref = ["width", "height"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dim = _ref[_i];
        if (typeof opts.size[dim] === "string") {
          opts.size[dim] = this.dimensions[dim] * (parseInt(opts.size[dim], 10) / 100);
        }
      }
    } else if (opts.size === "number") {
      size = opts.size;
      opts.size = {
        width: size,
        height: size
      };
    }
    if (typeof opts.cornerRadius === "string") {
      opts.cornerRadius = (opts.size.width / 2) * (parseInt(opts.cornerRadius, 10) / 100);
    }
    opts.strength /= 100;
    opts.size.width = Math.floor(opts.size.width);
    opts.size.height = Math.floor(opts.size.height);
    opts.image = {
      width: this.dimensions.width,
      height: this.dimensions.height
    };
    if (opts.method === "colorize" && typeof opts.color === "string") {
      opts.color = Convert.hexToRGB(opts.color);
    }
    opts.coords = {
      left: (this.dimensions.width - opts.size.width) / 2,
      right: this.dimensions.width - opts.coords.left,
      bottom: (this.dimensions.height - opts.size.height) / 2,
      top: this.dimensions.height - opts.coords.bottom
    };
    opts.corners = [
      {
        x: opts.coords.left + opts.cornerRadius,
        y: opts.coords.top - opts.cornerRadius
      }, {
        x: opts.coords.right - opts.cornerRadius,
        y: opts.coords.top - opts.cornerRadius
      }, {
        x: opts.coords.right - opts.cornerRadius,
        y: opts.coords.bottom + opts.cornerRadius
      }, {
        x: opts.coords.left + opts.cornerRadius,
        y: opts.coords.bottom + opts.cornerRadius
      }
    ];
    opts.maxDist = Calculate.distance(0, 0, opts.corners[3].x, opts.corners[3].y) - opts.cornerRadius;
    return this.process("rectangularVignette", function(rgba) {
      var amt, loc, radialDist;
      loc = this.locationXY();
      if ((loc.x > opts.corners[0].x && loc.x < opts.corners[1].x) && (loc.y > opts.coords.bottom && loc.y < opts.coords.top)) {
        return rgba;
      }
      if ((loc.x > opts.coords.left && loc.x < opts.coords.right) && (loc.y > opts.corners[3].y && loc.y < opts.corners[2].y)) {
        return rgba;
      }
      if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y > opts.coords.top) {
        amt = (loc.y - opts.coords.top) / opts.maxDist;
      } else if (loc.y > opts.corners[2].y && loc.y < opts.corners[1].y && loc.x > opts.coords.right) {
        amt = (loc.x - opts.coords.right) / opts.maxDist;
      } else if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y < opts.coords.bottom) {
        amt = (opts.coords.bottom - loc.y) / opts.maxDist;
      } else if (loc.y > opts.corners[2].y && loc.y < opts.corners[1].y && loc.x < opts.coords.left) {
        amt = (opts.coords.left - loc.x) / opts.maxDist;
      } else if (loc.x <= opts.corners[0].x && loc.y >= opts.corners[0].y) {
        radialDist = Caman.distance(loc.x, loc.y, opts.corners[0].x, opts.corners[0].y);
        amt = (radialDist - opts.cornerRadius) / opts.maxDist;
      } else if (loc.x >= opts.corners[1].x && loc.y >= opts.corners[1].y) {
        radialDist = Caman.distance(loc.x, loc.y, opts.corners[1].x, opts.corners[1].y);
        amt = (radialDist - opts.cornerRadius) / opts.maxDist;
      } else if (loc.x >= opts.corners[2].x && loc.y <= opts.corners[2].y) {
        radialDist = Caman.distance(loc.x, loc.y, opts.corners[2].x, opts.corners[2].y);
        amt = (radialDist - opts.cornerRadius) / opts.maxDist;
      } else if (loc.x <= opts.corners[3].x && loc.y <= opts.corners[3].y) {
        radialDist = Caman.distance(loc.x, loc.y, opts.corners[3].x, opts.corners[3].y);
        amt = (radialDist - opts.cornerRadius) / opts.maxDist;
      }
      if (amt < 0) {
        return rgba;
      }
      return vignetteFilters[opts.method](rgba, amt, opts);
    });
  });

  /*
  CompoundBlur - Blurring with varying radii for Canvas
  
  Version:   0.1
  Author:  Mario Klingemann
  Contact:   mario@quasimondo.com
  Website:  http://www.quasimondo.com/StackBlurForCanvas
  Twitter:  @quasimondo
  Modified By: Ryan LeFevre (@meltingice)
  
  In case you find this class useful - especially in commercial projects -
  I am not totally unhappy for a small donation to my PayPal account
  mario@quasimondo.de
  
  Copyright (c) 2011 Mario Klingemann
  
  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:
  
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
  */


  (function() {
    var BlurStack, getLinearGradientMap, getRadialGradientMap, mul_table, shg_table;
    mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
    shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    getLinearGradientMap = function(width, height, centerX, centerY, angle, length, mirrored) {
      var cnv, context, gradient, x1, x2, y1, y2;
      cnv = typeof exports !== "undefined" && exports !== null ? new Canvas() : document.createElement('canvas');
      cnv.width = width;
      cnv.height = height;
      x1 = centerX + Math.cos(angle) * length * 0.5;
      y1 = centerY + Math.sin(angle) * length * 0.5;
      x2 = centerX - Math.cos(angle) * length * 0.5;
      y2 = centerY - Math.sin(angle) * length * 0.5;
      context = cnv.getContext("2d");
      gradient = context.createLinearGradient(x1, y1, x2, y2);
      if (!mirrored) {
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "black");
      } else {
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.5, "black");
        gradient.addColorStop(1, "white");
      }
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      return context.getImageData(0, 0, width, height);
    };
    getRadialGradientMap = function(width, height, centerX, centerY, radius1, radius2) {
      var cnv, context, gradient;
      cnv = typeof exports !== "undefined" && exports !== null ? new Canvas() : document.createElement('canvas');
      cnv.width = width;
      cnv.height = height;
      context = cnv.getContext("2d");
      gradient = context.createRadialGradient(centerX, centerY, radius1, centerX, centerY, radius2);
      gradient.addColorStop(1, "white");
      gradient.addColorStop(0, "black");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      return context.getImageData(0, 0, width, height);
    };
    BlurStack = function() {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
      return this.next = null;
    };
    Caman.Plugin.register("compoundBlur", function(radiusData, radius, increaseFactor, blurLevels) {
      var b_in_sum, b_out_sum, b_sum, blend, currentIndex, div, g_in_sum, g_out_sum, g_sum, height, heightMinus1, i, iblend, idx, imagePixels, index, iradius, lookupValue, mul_sum, p, pb, pg, pixels, pr, r_in_sum, r_out_sum, r_sum, radiusPixels, radiusPlus1, rbs, shg_sum, stack, stackEnd, stackIn, stackOut, stackStart, steps, sumFactor, w4, wh, wh4, width, widthMinus1, x, y, yi, yp, yw, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
      width = this.dimensions.width;
      height = this.dimensions.height;
      imagePixels = this.pixelData;
      radiusPixels = radiusData.data;
      wh = width * height;
      wh4 = wh << 2;
      pixels = [];
      for (i = _i = 0; 0 <= wh4 ? _i < wh4 : _i > wh4; i = 0 <= wh4 ? ++_i : --_i) {
        pixels[i] = imagePixels[i];
      }
      currentIndex = 0;
      steps = blurLevels;
      blurLevels -= 1;
      while (steps-- >= 0) {
        iradius = (radius + 0.5) | 0;
        if (iradius === 0) {
          continue;
        }
        if (iradius > 256) {
          iradius = 256;
        }
        div = iradius + iradius + 1;
        w4 = width << 2;
        widthMinus1 = width - 1;
        heightMinus1 = height - 1;
        radiusPlus1 = iradius + 1;
        sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
        stackStart = new BlurStack();
        stackEnd = void 0;
        stack = stackStart;
        for (i = _j = 1; 1 <= div ? _j < div : _j > div; i = 1 <= div ? ++_j : --_j) {
          stack = stack.next = new BlurStack();
          if (i === radiusPlus1) {
            stackEnd = stack;
          }
        }
        stack.next = stackStart;
        stackIn = null;
        stackOut = null;
        yw = yi = 0;
        mul_sum = mul_table[iradius];
        shg_sum = shg_table[iradius];
        for (y = _k = 0; 0 <= height ? _k < height : _k > height; y = 0 <= height ? ++_k : --_k) {
          r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
          r_out_sum = radiusPlus1 * (pr = pixels[yi]);
          g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
          b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
          r_sum += sumFactor * pr;
          g_sum += sumFactor * pg;
          b_sum += sumFactor * pb;
          stack = stackStart;
          for (i = _l = 0; 0 <= radiusPlus1 ? _l < radiusPlus1 : _l > radiusPlus1; i = 0 <= radiusPlus1 ? ++_l : --_l) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
          }
          for (i = _m = 1; 1 <= radiusPlus1 ? _m < radiusPlus1 : _m > radiusPlus1; i = 1 <= radiusPlus1 ? ++_m : --_m) {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;
            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            stack = stack.next;
          }
          stackIn = stackStart;
          stackOut = stackEnd;
          for (x = _n = 0; 0 <= width ? _n < width : _n > width; x = 0 <= width ? ++_n : --_n) {
            pixels[yi] = (r_sum * mul_sum) >> shg_sum;
            pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
            pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;
            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            p = (yw + ((p = x + radiusPlus1) < widthMinus1 ? p : widthMinus1)) << 2;
            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p + 1]);
            b_in_sum += (stackIn.b = pixels[p + 2]);
            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;
            stackIn = stackIn.next;
            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            stackOut = stackOut.next;
            yi += 4;
          }
          yw += width;
        }
        for (x = _o = 0; 0 <= width ? _o < width : _o > width; x = 0 <= width ? ++_o : --_o) {
          g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
          yi = x << 2;
          r_out_sum = radiusPlus1 * (pr = pixels[yi]);
          g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
          b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
          r_sum += sumFactor * pr;
          g_sum += sumFactor * pg;
          b_sum += sumFactor * pb;
          stack = stackStart;
          for (i = _p = 0; 0 <= radiusPlus1 ? _p < radiusPlus1 : _p > radiusPlus1; i = 0 <= radiusPlus1 ? ++_p : --_p) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
          }
          yp = width;
          for (i = _q = 1; 1 <= radiusPlus1 ? _q < radiusPlus1 : _q > radiusPlus1; i = 1 <= radiusPlus1 ? ++_q : --_q) {
            yi = (yp + x) << 2;
            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            stack = stack.next;
            if (i < heightMinus1) {
              yp += width;
            }
          }
          yi = x;
          stackIn = stackStart;
          stackOut = stackEnd;
          for (y = _r = 0; 0 <= height ? _r < height : _r > height; y = 0 <= height ? ++_r : --_r) {
            p = yi << 2;
            pixels[p] = (r_sum * mul_sum) >> shg_sum;
            pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
            pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;
            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;
            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
            stackIn = stackIn.next;
            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            stackOut = stackOut.next;
            yi += width;
          }
        }
        radius *= increaseFactor;
        i = wh;
        while (--i > -1) {
          idx = i << 2;
          lookupValue = (radiusPixels[idx + 2] & 0xff) / 255.0 * blurLevels;
          index = lookupValue | 0;
          if (index === currentIndex) {
            blend = 256.0 * (lookupValue - (lookupValue | 0));
            iblend = 256 - blend;
            imagePixels[idx] = (imagePixels[idx] * iblend + pixels[idx] * blend) >> 8;
            imagePixels[idx + 1] = (imagePixels[idx + 1] * iblend + pixels[idx + 1] * blend) >> 8;
            imagePixels[idx + 2] = (imagePixels[idx + 2] * iblend + pixels[idx + 2] * blend) >> 8;
          } else if (index === currentIndex + 1) {
            imagePixels[idx] = pixels[idx];
            imagePixels[idx + 1] = pixels[idx + 1];
            imagePixels[idx + 2] = pixels[idx + 2];
          }
        }
        currentIndex++;
      }
      return this;
    });
    Caman.Filter.register("tiltShift", function(opts) {
      var defaults, gradient;
      defaults = {
        center: {
          x: this.dimensions.width / 2,
          y: this.dimensions.height / 2
        },
        angle: 45,
        focusWidth: 200,
        startRadius: 3,
        radiusFactor: 1.5,
        steps: 3
      };
      opts = Util.extend(defaults, opts);
      opts.angle *= Math.PI / 180;
      gradient = getLinearGradientMap(this.dimensions.width, this.dimensions.height, opts.center.x, opts.center.y, opts.angle, opts.focusWidth, true);
      return this.processPlugin("compoundBlur", [gradient, opts.startRadius, opts.radiusFactor, opts.steps]);
    });
    return Caman.Filter.register("radialBlur", function(opts) {
      var defaults, gradient, radius1, radius2;
      defaults = {
        size: 50,
        center: {
          x: this.dimensions.width / 2,
          y: this.dimensions.height / 2
        },
        startRadius: 3,
        radiusFactor: 1.5,
        steps: 3,
        radius: null
      };
      opts = Util.extend(defaults, opts);
      if (!opts.radius) {
        opts.radius = this.dimensions.width < this.dimensions.height ? this.dimensions.height : this.dimensions.width;
      }
      radius1 = (opts.radius / 2) - opts.size;
      radius2 = opts.radius / 2;
      gradient = getRadialGradientMap(this.dimensions.width, this.dimensions.height, opts.center.x, opts.center.y, radius1, radius2);
      return this.processPlugin("compoundBlur", [gradient, opts.startRadius, opts.radiusFactor, opts.steps]);
    });
  })();

  Caman.Filter.register("edgeEnhance", function() {
    return this.processKernel("Edge Enhance", [0, 0, 0, -1, 1, 0, 0, 0, 0]);
  });

  Caman.Filter.register("edgeDetect", function() {
    return this.processKernel("Edge Detect", [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
  });

  Caman.Filter.register("emboss", function() {
    return this.processKernel("Emboss", [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
  });

  Caman.Filter.register("posterize", function(adjust) {
    var numOfAreas, numOfValues;
    numOfAreas = 256 / adjust;
    numOfValues = 255 / (adjust - 1);
    return this.process("posterize", function(rgba) {
      rgba.r = Math.floor(Math.floor(rgba.r / numOfAreas) * numOfValues);
      rgba.g = Math.floor(Math.floor(rgba.g / numOfAreas) * numOfValues);
      rgba.b = Math.floor(Math.floor(rgba.b / numOfAreas) * numOfValues);
      return rgba;
    });
  });

  Caman.Filter.register("vintage", function(vignette) {
    if (vignette == null) {
      vignette = true;
    }
    this.greyscale();
    this.contrast(5);
    this.noise(3);
    this.sepia(100);
    this.channels({
      red: 8,
      blue: 2,
      green: 4
    });
    this.gamma(0.87);
    if (vignette) {
      return this.vignette("40%", 30);
    }
  });

  Caman.Filter.register("lomo", function(vignette) {
    if (vignette == null) {
      vignette = true;
    }
    this.brightness(15);
    this.exposure(15);
    this.curves('rgb', [0, 0], [200, 0], [155, 255], [255, 255]);
    this.saturation(-20);
    this.gamma(1.8);
    if (vignette) {
      this.vignette("50%", 60);
    }
    return this.brightness(5);
  });

  Caman.Filter.register("clarity", function(grey) {
    if (grey == null) {
      grey = false;
    }
    this.vibrance(20);
    this.curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255]);
    this.sharpen(15);
    this.vignette("45%", 20);
    if (grey) {
      this.greyscale();
      this.contrast(4);
    }
    return this;
  });

  Caman.Filter.register("sinCity", function() {
    this.contrast(100);
    this.brightness(15);
    this.exposure(10);
    this.posterize(80);
    this.clip(30);
    return this.greyscale();
  });

  Caman.Filter.register("sunrise", function() {
    this.exposure(3.5);
    this.saturation(-5);
    this.vibrance(50);
    this.sepia(60);
    this.colorize("#e87b22", 10);
    this.channels({
      red: 8,
      blue: 8
    });
    this.contrast(5);
    this.gamma(1.2);
    return this.vignette("55%", 25);
  });

  Caman.Filter.register("crossProcess", function() {
    this.exposure(5);
    this.colorize("#e87b22", 4);
    this.sepia(20);
    this.channels({
      blue: 8,
      red: 3
    });
    this.curves('b', [0, 0], [100, 150], [180, 180], [255, 255]);
    this.contrast(15);
    this.vibrance(75);
    return this.gamma(1.6);
  });

  Caman.Filter.register("orangePeel", function() {
    this.curves('rgb', [0, 0], [100, 50], [140, 200], [255, 255]);
    this.vibrance(-30);
    this.saturation(-30);
    this.colorize('#ff9000', 30);
    this.contrast(-5);
    return this.gamma(1.4);
  });

  Caman.Filter.register("love", function() {
    this.brightness(5);
    this.exposure(8);
    this.contrast(4);
    this.colorize('#c42007', 30);
    this.vibrance(50);
    return this.gamma(1.3);
  });

  Caman.Filter.register("grungy", function() {
    this.gamma(1.5);
    this.clip(25);
    this.saturation(-60);
    this.contrast(5);
    this.noise(5);
    return this.vignette("50%", 30);
  });

  Caman.Filter.register("jarques", function() {
    this.saturation(-35);
    this.curves('b', [20, 0], [90, 120], [186, 144], [255, 230]);
    this.curves('r', [0, 0], [144, 90], [138, 120], [255, 255]);
    this.curves('g', [10, 0], [115, 105], [148, 100], [255, 248]);
    this.curves('rgb', [0, 0], [120, 100], [128, 140], [255, 255]);
    return this.sharpen(20);
  });

  Caman.Filter.register("pinhole", function() {
    this.greyscale();
    this.sepia(10);
    this.exposure(10);
    this.contrast(15);
    return this.vignette("60%", 35);
  });

  Caman.Filter.register("oldBoot", function() {
    this.saturation(-20);
    this.vibrance(-50);
    this.gamma(1.1);
    this.sepia(30);
    this.channels({
      red: -10,
      blue: 5
    });
    this.curves('rgb', [0, 0], [80, 50], [128, 230], [255, 255]);
    return this.vignette("60%", 30);
  });

  Caman.Filter.register("glowingSun", function(vignette) {
    if (vignette == null) {
      vignette = true;
    }
    this.brightness(10);
    this.newLayer(function() {
      this.setBlendingMode("multiply");
      this.opacity(80);
      this.copyParent();
      this.filter.gamma(0.8);
      this.filter.contrast(50);
      return this.filter.exposure(10);
    });
    this.newLayer(function() {
      this.setBlendingMode("softLight");
      this.opacity(80);
      return this.fillColor("#f49600");
    });
    this.exposure(20);
    this.gamma(0.8);
    if (vignette) {
      return this.vignette("45%", 20);
    }
  });

  Caman.Filter.register("hazyDays", function() {
    this.gamma(1.2);
    this.newLayer(function() {
      this.setBlendingMode("overlay");
      this.opacity(60);
      this.copyParent();
      this.filter.channels({
        red: 5
      });
      return this.filter.stackBlur(15);
    });
    this.newLayer(function() {
      this.setBlendingMode("addition");
      this.opacity(40);
      return this.fillColor("#6899ba");
    });
    this.newLayer(function() {
      this.setBlendingMode("multiply");
      this.opacity(35);
      this.copyParent();
      this.filter.brightness(40);
      this.filter.vibrance(40);
      this.filter.exposure(30);
      this.filter.contrast(15);
      this.filter.curves('r', [0, 40], [128, 128], [128, 128], [255, 215]);
      this.filter.curves('g', [0, 40], [128, 128], [128, 128], [255, 215]);
      this.filter.curves('b', [0, 40], [128, 128], [128, 128], [255, 215]);
      return this.filter.stackBlur(5);
    });
    this.curves('r', [20, 0], [128, 158], [128, 128], [235, 255]);
    this.curves('g', [20, 0], [128, 128], [128, 128], [235, 255]);
    this.curves('b', [20, 0], [128, 108], [128, 128], [235, 255]);
    return this.vignette("45%", 20);
  });

  Caman.Filter.register("herMajesty", function() {
    this.brightness(40);
    this.colorize("#ea1c5d", 10);
    this.curves('b', [0, 10], [128, 180], [190, 190], [255, 255]);
    this.newLayer(function() {
      this.setBlendingMode('overlay');
      this.opacity(50);
      this.copyParent();
      this.filter.gamma(0.7);
      return this.newLayer(function() {
        this.setBlendingMode('normal');
        this.opacity(60);
        return this.fillColor('#ea1c5d');
      });
    });
    this.newLayer(function() {
      this.setBlendingMode('multiply');
      this.opacity(60);
      this.copyParent();
      this.filter.saturation(50);
      this.filter.hue(90);
      return this.filter.contrast(10);
    });
    this.gamma(1.4);
    this.vibrance(-30);
    this.newLayer(function() {
      this.opacity(10);
      return this.fillColor('#e5f0ff');
    });
    return this;
  });

  Caman.Filter.register("nostalgia", function() {
    this.saturation(20);
    this.gamma(1.4);
    this.greyscale();
    this.contrast(5);
    this.sepia(100);
    this.channels({
      red: 8,
      blue: 2,
      green: 4
    });
    this.gamma(0.8);
    this.contrast(5);
    this.exposure(10);
    this.newLayer(function() {
      this.setBlendingMode('overlay');
      this.copyParent();
      this.opacity(55);
      return this.filter.stackBlur(10);
    });
    return this.vignette("50%", 30);
  });

  Caman.Filter.register("hemingway", function() {
    this.greyscale();
    this.contrast(10);
    this.gamma(0.9);
    this.newLayer(function() {
      this.setBlendingMode("multiply");
      this.opacity(40);
      this.copyParent();
      this.filter.exposure(15);
      this.filter.contrast(15);
      return this.filter.channels({
        green: 10,
        red: 5
      });
    });
    this.sepia(30);
    this.curves('rgb', [0, 10], [120, 90], [180, 200], [235, 255]);
    this.channels({
      red: 5,
      green: -2
    });
    return this.exposure(15);
  });

  Caman.Filter.register("concentrate", function() {
    this.sharpen(40);
    this.saturation(-50);
    this.channels({
      red: 3
    });
    this.newLayer(function() {
      this.setBlendingMode("multiply");
      this.opacity(80);
      this.copyParent();
      this.filter.sharpen(5);
      this.filter.contrast(50);
      this.filter.exposure(10);
      return this.filter.channels({
        blue: 5
      });
    });
    return this.brightness(10);
  });

  /*
  StackBlur - a fast almost Gaussian Blur For Canvas v0.31 modified for CamanJS
  
  Version:   0.31
  Author:    Mario Klingemann
  Contact:   mario@quasimondo.com
  Website:  http://www.quasimondo.com/StackBlurForCanvas
  Twitter:  @quasimondo
  Modified By: Ryan LeFevre (@meltingice)
  
  In case you find this class useful - especially in commercial projects -
  I am not totally unhappy for a small donation to my PayPal account
  mario@quasimondo.de
  
  Or support me on flattr: 
  https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript
  
  Copyright (c) 2010 Mario Klingemann
  
  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:
  
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
  */


  (function() {
    var BlurStack, mul_table, shg_table;
    mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
    shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    BlurStack = function() {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
      return this.next = null;
    };
    Caman.Plugin.register("stackBlur", function(radius) {
      var b_in_sum, b_out_sum, b_sum, div, g_in_sum, g_out_sum, g_sum, height, heightMinus1, i, mul_sum, p, pb, pg, pixels, pr, r_in_sum, r_out_sum, r_sum, radiusPlus1, rbs, shg_sum, stack, stackEnd, stackIn, stackOut, stackStart, sumFactor, w4, width, widthMinus1, x, y, yi, yp, yw, _i, _j, _k, _l, _m, _n, _o, _p, _q;
      if (isNaN(radius) || radius < 1) {
        return;
      }
      radius |= 0;
      pixels = this.pixelData;
      width = this.dimensions.width;
      height = this.dimensions.height;
      div = radius + radius + 1;
      w4 = width << 2;
      widthMinus1 = width - 1;
      heightMinus1 = height - 1;
      radiusPlus1 = radius + 1;
      sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
      stackStart = new BlurStack();
      stack = stackStart;
      for (i = _i = 1; 1 <= div ? _i < div : _i > div; i = 1 <= div ? ++_i : --_i) {
        stack = stack.next = new BlurStack();
        if (i === radiusPlus1) {
          stackEnd = stack;
        }
      }
      stack.next = stackStart;
      stackIn = null;
      stackOut = null;
      yw = yi = 0;
      mul_sum = mul_table[radius];
      shg_sum = shg_table[radius];
      for (y = _j = 0; 0 <= height ? _j < height : _j > height; y = 0 <= height ? ++_j : --_j) {
        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        stack = stackStart;
        for (i = _k = 0; 0 <= radiusPlus1 ? _k < radiusPlus1 : _k > radiusPlus1; i = 0 <= radiusPlus1 ? ++_k : --_k) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }
        for (i = _l = 1; 1 <= radiusPlus1 ? _l < radiusPlus1 : _l > radiusPlus1; i = 1 <= radiusPlus1 ? ++_l : --_l) {
          p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
          r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
          b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = _m = 0; 0 <= width ? _m < width : _m > width; x = 0 <= width ? ++_m : --_m) {
          pixels[yi] = (r_sum * mul_sum) >> shg_sum;
          pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
          pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;
          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
          r_in_sum += (stackIn.r = pixels[p]);
          g_in_sum += (stackIn.g = pixels[p + 1]);
          b_in_sum += (stackIn.b = pixels[p + 2]);
          r_sum += r_in_sum;
          g_sum += g_in_sum;
          b_sum += b_in_sum;
          stackIn = stackIn.next;
          r_out_sum += (pr = stackOut.r);
          g_out_sum += (pg = stackOut.g);
          b_out_sum += (pb = stackOut.b);
          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          stackOut = stackOut.next;
          yi += 4;
        }
        yw += width;
      }
      for (x = _n = 0; 0 <= width ? _n < width : _n > width; x = 0 <= width ? ++_n : --_n) {
        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        stack = stackStart;
        for (i = _o = 0; 0 <= radiusPlus1 ? _o < radiusPlus1 : _o > radiusPlus1; i = 0 <= radiusPlus1 ? ++_o : --_o) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }
        yp = width;
        for (i = _p = 1; 1 <= radius ? _p <= radius : _p >= radius; i = 1 <= radius ? ++_p : --_p) {
          yi = (yp + x) << 2;
          r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
          b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          stack = stack.next;
          if (i < heightMinus1) {
            yp += width;
          }
        }
        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = _q = 0; 0 <= height ? _q < height : _q > height; y = 0 <= height ? ++_q : --_q) {
          p = yi << 2;
          pixels[p] = (r_sum * mul_sum) >> shg_sum;
          pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
          pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;
          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;
          r_sum += (r_in_sum += (stackIn.r = pixels[p]));
          g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
          b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
          stackIn = stackIn.next;
          r_out_sum += (pr = stackOut.r);
          g_out_sum += (pg = stackOut.g);
          b_out_sum += (pb = stackOut.b);
          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          stackOut = stackOut.next;
          yi += width;
        }
      }
      return this;
    });
    return Caman.Filter.register("stackBlur", function(radius) {
      return this.processPlugin("stackBlur", [radius]);
    });
  })();

  Caman.Filter.register("threshold", function(adjust) {
    return this.process("threshold", function(rgba) {
      var luminance;
      luminance = (0.2126 * rgba.r) + (0.7152 * rgba.g) + (0.0722 * rgba.b);
      if (luminance < adjust) {
        rgba.r = 0;
        rgba.g = 0;
        rgba.b = 0;
      } else {
        rgba.r = 255;
        rgba.g = 255;
        rgba.b = 255;
      }
      return rgba;
    });
  });

}).call(this);

/*!
 * Cropper v2.3.4
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2014-2016 Fengyuan Chen and contributors
 * Released under the MIT license
 *
 * Date: 2016-09-03T05:50:45.412Z
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function i(t){return"number"==typeof t&&!isNaN(t)}function e(t){return"undefined"==typeof t}function s(t,e){var s=[];return i(e)&&s.push(e),s.slice.apply(t,s)}function a(t,i){var e=s(arguments,2);return function(){return t.apply(i,e.concat(s(arguments)))}}function o(t){var i=t.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);return i&&(i[1]!==C.protocol||i[2]!==C.hostname||i[3]!==C.port)}function h(t){var i="timestamp="+(new Date).getTime();return t+(t.indexOf("?")===-1?"?":"&")+i}function n(t){return t?' crossOrigin="'+t+'"':""}function r(t,i){var e;return t.naturalWidth&&!mt?i(t.naturalWidth,t.naturalHeight):(e=document.createElement("img"),e.onload=function(){i(this.width,this.height)},void(e.src=t.src))}function p(t){var e=[],s=t.rotate,a=t.scaleX,o=t.scaleY;return i(s)&&0!==s&&e.push("rotate("+s+"deg)"),i(a)&&1!==a&&e.push("scaleX("+a+")"),i(o)&&1!==o&&e.push("scaleY("+o+")"),e.length?e.join(" "):"none"}function l(t,i){var e,s,a=Ct(t.degree)%180,o=(a>90?180-a:a)*Math.PI/180,h=bt(o),n=Bt(o),r=t.width,p=t.height,l=t.aspectRatio;return i?(e=r/(n+h/l),s=e/l):(e=r*n+p*h,s=r*h+p*n),{width:e,height:s}}function c(e,s){var a,o,h,n=t("<canvas>")[0],r=n.getContext("2d"),p=0,c=0,d=s.naturalWidth,g=s.naturalHeight,u=s.rotate,f=s.scaleX,m=s.scaleY,v=i(f)&&i(m)&&(1!==f||1!==m),w=i(u)&&0!==u,x=w||v,C=d*Ct(f||1),b=g*Ct(m||1);return v&&(a=C/2,o=b/2),w&&(h=l({width:C,height:b,degree:u}),C=h.width,b=h.height,a=C/2,o=b/2),n.width=C,n.height=b,x&&(p=-d/2,c=-g/2,r.save(),r.translate(a,o)),w&&r.rotate(u*Math.PI/180),v&&r.scale(f,m),r.drawImage(e,$t(p),$t(c),$t(d),$t(g)),x&&r.restore(),n}function d(i){var e=i.length,s=0,a=0;return e&&(t.each(i,function(t,i){s+=i.pageX,a+=i.pageY}),s/=e,a/=e),{pageX:s,pageY:a}}function g(t,i,e){var s,a="";for(s=i,e+=i;s<e;s++)a+=Lt(t.getUint8(s));return a}function u(t){var i,e,s,a,o,h,n,r,p,l,c=new D(t),d=c.byteLength;if(255===c.getUint8(0)&&216===c.getUint8(1))for(p=2;p<d;){if(255===c.getUint8(p)&&225===c.getUint8(p+1)){n=p;break}p++}if(n&&(e=n+4,s=n+10,"Exif"===g(c,e,4)&&(h=c.getUint16(s),o=18761===h,(o||19789===h)&&42===c.getUint16(s+2,o)&&(a=c.getUint32(s+4,o),a>=8&&(r=s+a)))),r)for(d=c.getUint16(r,o),l=0;l<d;l++)if(p=r+12*l+2,274===c.getUint16(p,o)){p+=8,i=c.getUint16(p,o),mt&&c.setUint16(p,1,o);break}return i}function f(t){var i,e=t.replace(G,""),s=atob(e),a=s.length,o=new B(a),h=new y(o);for(i=0;i<a;i++)h[i]=s.charCodeAt(i);return o}function m(t){var i,e=new y(t),s=e.length,a="";for(i=0;i<s;i++)a+=Lt(e[i]);return"data:image/jpeg;base64,"+$(a)}function v(i,e){this.$element=t(i),this.options=t.extend({},v.DEFAULTS,t.isPlainObject(e)&&e),this.isLoaded=!1,this.isBuilt=!1,this.isCompleted=!1,this.isRotated=!1,this.isCropped=!1,this.isDisabled=!1,this.isReplaced=!1,this.isLimited=!1,this.wheeling=!1,this.isImg=!1,this.originalUrl="",this.canvas=null,this.cropBox=null,this.init()}var w=t(window),x=t(document),C=window.location,b=window.navigator,B=window.ArrayBuffer,y=window.Uint8Array,D=window.DataView,$=window.btoa,L="cropper",T="cropper-modal",X="cropper-hide",Y="cropper-hidden",k="cropper-invisible",M="cropper-move",W="cropper-crop",H="cropper-disabled",R="cropper-bg",z="mousedown touchstart pointerdown MSPointerDown",O="mousemove touchmove pointermove MSPointerMove",P="mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",E="wheel mousewheel DOMMouseScroll",U="dblclick",I="load."+L,F="error."+L,j="resize."+L,A="build."+L,S="built."+L,N="cropstart."+L,_="cropmove."+L,q="cropend."+L,K="crop."+L,Z="zoom."+L,Q=/^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/,V=/^data:/,G=/^data:([^;]+);base64,/,J=/^data:image\/jpeg.*;base64,/,tt="preview",it="action",et="e",st="w",at="s",ot="n",ht="se",nt="sw",rt="ne",pt="nw",lt="all",ct="crop",dt="move",gt="zoom",ut="none",ft=t.isFunction(t("<canvas>")[0].getContext),mt=b&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(b.userAgent),vt=Number,wt=Math.min,xt=Math.max,Ct=Math.abs,bt=Math.sin,Bt=Math.cos,yt=Math.sqrt,Dt=Math.round,$t=Math.floor,Lt=String.fromCharCode;v.prototype={constructor:v,init:function(){var t,i=this.$element;if(i.is("img")){if(this.isImg=!0,this.originalUrl=t=i.attr("src"),!t)return;t=i.prop("src")}else i.is("canvas")&&ft&&(t=i[0].toDataURL());this.load(t)},trigger:function(i,e){var s=t.Event(i,e);return this.$element.trigger(s),s},load:function(i){var e,s,a=this.options,n=this.$element;if(i&&(n.one(A,a.build),!this.trigger(A).isDefaultPrevented())){if(this.url=i,this.image={},!a.checkOrientation||!B)return this.clone();if(e=t.proxy(this.read,this),V.test(i))return J.test(i)?e(f(i)):this.clone();s=new XMLHttpRequest,s.onerror=s.onabort=t.proxy(function(){this.clone()},this),s.onload=function(){e(this.response)},a.checkCrossOrigin&&o(i)&&n.prop("crossOrigin")&&(i=h(i)),s.open("get",i),s.responseType="arraybuffer",s.send()}},read:function(t){var i=this.options,e=u(t),s=this.image,a=0,o=1,h=1;if(e>1)switch(this.url=m(t),e){case 2:o=-1;break;case 3:a=-180;break;case 4:h=-1;break;case 5:a=90,h=-1;break;case 6:a=90;break;case 7:a=90,o=-1;break;case 8:a=-90}i.rotatable&&(s.rotate=a),i.scalable&&(s.scaleX=o,s.scaleY=h),this.clone()},clone:function(){var i,e,s=this.options,a=this.$element,r=this.url,p="";s.checkCrossOrigin&&o(r)&&(p=a.prop("crossOrigin"),p?i=r:(p="anonymous",i=h(r))),this.crossOrigin=p,this.crossOriginUrl=i,this.$clone=e=t("<img"+n(p)+' src="'+(i||r)+'">'),this.isImg?a[0].complete?this.start():a.one(I,t.proxy(this.start,this)):e.one(I,t.proxy(this.start,this)).one(F,t.proxy(this.stop,this)).addClass(X).insertAfter(a)},start:function(){var i=this.$element,e=this.$clone;this.isImg||(e.off(F,this.stop),i=e),r(i[0],t.proxy(function(i,e){t.extend(this.image,{naturalWidth:i,naturalHeight:e,aspectRatio:i/e}),this.isLoaded=!0,this.build()},this))},stop:function(){this.$clone.remove(),this.$clone=null},build:function(){var i,e,s,a=this.options,o=this.$element,h=this.$clone;this.isLoaded&&(this.isBuilt&&this.unbuild(),this.$container=o.parent(),this.$cropper=i=t(v.TEMPLATE),this.$canvas=i.find(".cropper-canvas").append(h),this.$dragBox=i.find(".cropper-drag-box"),this.$cropBox=e=i.find(".cropper-crop-box"),this.$viewBox=i.find(".cropper-view-box"),this.$face=s=e.find(".cropper-face"),o.addClass(Y).after(i),this.isImg||h.removeClass(X),this.initPreview(),this.bind(),a.aspectRatio=xt(0,a.aspectRatio)||NaN,a.viewMode=xt(0,wt(3,Dt(a.viewMode)))||0,a.autoCrop?(this.isCropped=!0,a.modal&&this.$dragBox.addClass(T)):e.addClass(Y),a.guides||e.find(".cropper-dashed").addClass(Y),a.center||e.find(".cropper-center").addClass(Y),a.cropBoxMovable&&s.addClass(M).data(it,lt),a.highlight||s.addClass(k),a.background&&i.addClass(R),a.cropBoxResizable||e.find(".cropper-line, .cropper-point").addClass(Y),this.setDragMode(a.dragMode),this.render(),this.isBuilt=!0,this.setData(a.data),o.one(S,a.built),this.completing=setTimeout(t.proxy(function(){this.trigger(S),this.trigger(K,this.getData()),this.isCompleted=!0},this),0))},unbuild:function(){this.isBuilt&&(this.isCompleted||clearTimeout(this.completing),this.isBuilt=!1,this.isCompleted=!1,this.initialImage=null,this.initialCanvas=null,this.initialCropBox=null,this.container=null,this.canvas=null,this.cropBox=null,this.unbind(),this.resetPreview(),this.$preview=null,this.$viewBox=null,this.$cropBox=null,this.$dragBox=null,this.$canvas=null,this.$container=null,this.$cropper.remove(),this.$cropper=null)},render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.isCropped&&this.renderCropBox()},initContainer:function(){var t=this.options,i=this.$element,e=this.$container,s=this.$cropper;s.addClass(Y),i.removeClass(Y),s.css(this.container={width:xt(e.width(),vt(t.minContainerWidth)||200),height:xt(e.height(),vt(t.minContainerHeight)||100)}),i.addClass(Y),s.removeClass(Y)},initCanvas:function(){var i,e=this.options.viewMode,s=this.container,a=s.width,o=s.height,h=this.image,n=h.naturalWidth,r=h.naturalHeight,p=90===Ct(h.rotate),l=p?r:n,c=p?n:r,d=l/c,g=a,u=o;o*d>a?3===e?g=o*d:u=a/d:3===e?u=a/d:g=o*d,i={naturalWidth:l,naturalHeight:c,aspectRatio:d,width:g,height:u},i.oldLeft=i.left=(a-g)/2,i.oldTop=i.top=(o-u)/2,this.canvas=i,this.isLimited=1===e||2===e,this.limitCanvas(!0,!0),this.initialImage=t.extend({},h),this.initialCanvas=t.extend({},i)},limitCanvas:function(t,i){var e,s,a,o,h=this.options,n=h.viewMode,r=this.container,p=r.width,l=r.height,c=this.canvas,d=c.aspectRatio,g=this.cropBox,u=this.isCropped&&g;t&&(e=vt(h.minCanvasWidth)||0,s=vt(h.minCanvasHeight)||0,n&&(n>1?(e=xt(e,p),s=xt(s,l),3===n&&(s*d>e?e=s*d:s=e/d)):e?e=xt(e,u?g.width:0):s?s=xt(s,u?g.height:0):u&&(e=g.width,s=g.height,s*d>e?e=s*d:s=e/d)),e&&s?s*d>e?s=e/d:e=s*d:e?s=e/d:s&&(e=s*d),c.minWidth=e,c.minHeight=s,c.maxWidth=1/0,c.maxHeight=1/0),i&&(n?(a=p-c.width,o=l-c.height,c.minLeft=wt(0,a),c.minTop=wt(0,o),c.maxLeft=xt(0,a),c.maxTop=xt(0,o),u&&this.isLimited&&(c.minLeft=wt(g.left,g.left+g.width-c.width),c.minTop=wt(g.top,g.top+g.height-c.height),c.maxLeft=g.left,c.maxTop=g.top,2===n&&(c.width>=p&&(c.minLeft=wt(0,a),c.maxLeft=xt(0,a)),c.height>=l&&(c.minTop=wt(0,o),c.maxTop=xt(0,o))))):(c.minLeft=-c.width,c.minTop=-c.height,c.maxLeft=p,c.maxTop=l))},renderCanvas:function(t){var i,e,s=this.canvas,a=this.image,o=a.rotate,h=a.naturalWidth,n=a.naturalHeight;this.isRotated&&(this.isRotated=!1,e=l({width:a.width,height:a.height,degree:o}),i=e.width/e.height,i!==s.aspectRatio&&(s.left-=(e.width-s.width)/2,s.top-=(e.height-s.height)/2,s.width=e.width,s.height=e.height,s.aspectRatio=i,s.naturalWidth=h,s.naturalHeight=n,o%180&&(e=l({width:h,height:n,degree:o}),s.naturalWidth=e.width,s.naturalHeight=e.height),this.limitCanvas(!0,!1))),(s.width>s.maxWidth||s.width<s.minWidth)&&(s.left=s.oldLeft),(s.height>s.maxHeight||s.height<s.minHeight)&&(s.top=s.oldTop),s.width=wt(xt(s.width,s.minWidth),s.maxWidth),s.height=wt(xt(s.height,s.minHeight),s.maxHeight),this.limitCanvas(!1,!0),s.oldLeft=s.left=wt(xt(s.left,s.minLeft),s.maxLeft),s.oldTop=s.top=wt(xt(s.top,s.minTop),s.maxTop),this.$canvas.css({width:s.width,height:s.height,left:s.left,top:s.top}),this.renderImage(),this.isCropped&&this.isLimited&&this.limitCropBox(!0,!0),t&&this.output()},renderImage:function(i){var e,s=this.canvas,a=this.image;a.rotate&&(e=l({width:s.width,height:s.height,degree:a.rotate,aspectRatio:a.aspectRatio},!0)),t.extend(a,e?{width:e.width,height:e.height,left:(s.width-e.width)/2,top:(s.height-e.height)/2}:{width:s.width,height:s.height,left:0,top:0}),this.$clone.css({width:a.width,height:a.height,marginLeft:a.left,marginTop:a.top,transform:p(a)}),i&&this.output()},initCropBox:function(){var i=this.options,e=this.canvas,s=i.aspectRatio,a=vt(i.autoCropArea)||.8,o={width:e.width,height:e.height};s&&(e.height*s>e.width?o.height=o.width/s:o.width=o.height*s),this.cropBox=o,this.limitCropBox(!0,!0),o.width=wt(xt(o.width,o.minWidth),o.maxWidth),o.height=wt(xt(o.height,o.minHeight),o.maxHeight),o.width=xt(o.minWidth,o.width*a),o.height=xt(o.minHeight,o.height*a),o.oldLeft=o.left=e.left+(e.width-o.width)/2,o.oldTop=o.top=e.top+(e.height-o.height)/2,this.initialCropBox=t.extend({},o)},limitCropBox:function(t,i){var e,s,a,o,h=this.options,n=h.aspectRatio,r=this.container,p=r.width,l=r.height,c=this.canvas,d=this.cropBox,g=this.isLimited;t&&(e=vt(h.minCropBoxWidth)||0,s=vt(h.minCropBoxHeight)||0,e=wt(e,p),s=wt(s,l),a=wt(p,g?c.width:p),o=wt(l,g?c.height:l),n&&(e&&s?s*n>e?s=e/n:e=s*n:e?s=e/n:s&&(e=s*n),o*n>a?o=a/n:a=o*n),d.minWidth=wt(e,a),d.minHeight=wt(s,o),d.maxWidth=a,d.maxHeight=o),i&&(g?(d.minLeft=xt(0,c.left),d.minTop=xt(0,c.top),d.maxLeft=wt(p,c.left+c.width)-d.width,d.maxTop=wt(l,c.top+c.height)-d.height):(d.minLeft=0,d.minTop=0,d.maxLeft=p-d.width,d.maxTop=l-d.height))},renderCropBox:function(){var t=this.options,i=this.container,e=i.width,s=i.height,a=this.cropBox;(a.width>a.maxWidth||a.width<a.minWidth)&&(a.left=a.oldLeft),(a.height>a.maxHeight||a.height<a.minHeight)&&(a.top=a.oldTop),a.width=wt(xt(a.width,a.minWidth),a.maxWidth),a.height=wt(xt(a.height,a.minHeight),a.maxHeight),this.limitCropBox(!1,!0),a.oldLeft=a.left=wt(xt(a.left,a.minLeft),a.maxLeft),a.oldTop=a.top=wt(xt(a.top,a.minTop),a.maxTop),t.movable&&t.cropBoxMovable&&this.$face.data(it,a.width===e&&a.height===s?dt:lt),this.$cropBox.css({width:a.width,height:a.height,left:a.left,top:a.top}),this.isCropped&&this.isLimited&&this.limitCanvas(!0,!0),this.isDisabled||this.output()},output:function(){this.preview(),this.isCompleted&&this.trigger(K,this.getData())},initPreview:function(){var i,e=n(this.crossOrigin),s=e?this.crossOriginUrl:this.url;this.$preview=t(this.options.preview),this.$clone2=i=t("<img"+e+' src="'+s+'">'),this.$viewBox.html(i),this.$preview.each(function(){var i=t(this);i.data(tt,{width:i.width(),height:i.height(),html:i.html()}),i.html("<img"+e+' src="'+s+'" style="display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;">')})},resetPreview:function(){this.$preview.each(function(){var i=t(this),e=i.data(tt);i.css({width:e.width,height:e.height}).html(e.html).removeData(tt)})},preview:function(){var i=this.image,e=this.canvas,s=this.cropBox,a=s.width,o=s.height,h=i.width,n=i.height,r=s.left-e.left-i.left,l=s.top-e.top-i.top;this.isCropped&&!this.isDisabled&&(this.$clone2.css({width:h,height:n,marginLeft:-r,marginTop:-l,transform:p(i)}),this.$preview.each(function(){var e=t(this),s=e.data(tt),c=s.width,d=s.height,g=c,u=d,f=1;a&&(f=c/a,u=o*f),o&&u>d&&(f=d/o,g=a*f,u=d),e.css({width:g,height:u}).find("img").css({width:h*f,height:n*f,marginLeft:-r*f,marginTop:-l*f,transform:p(i)})}))},bind:function(){var i=this.options,e=this.$element,s=this.$cropper;t.isFunction(i.cropstart)&&e.on(N,i.cropstart),t.isFunction(i.cropmove)&&e.on(_,i.cropmove),t.isFunction(i.cropend)&&e.on(q,i.cropend),t.isFunction(i.crop)&&e.on(K,i.crop),t.isFunction(i.zoom)&&e.on(Z,i.zoom),s.on(z,t.proxy(this.cropStart,this)),i.zoomable&&i.zoomOnWheel&&s.on(E,t.proxy(this.wheel,this)),i.toggleDragModeOnDblclick&&s.on(U,t.proxy(this.dblclick,this)),x.on(O,this._cropMove=a(this.cropMove,this)).on(P,this._cropEnd=a(this.cropEnd,this)),i.responsive&&w.on(j,this._resize=a(this.resize,this))},unbind:function(){var i=this.options,e=this.$element,s=this.$cropper;t.isFunction(i.cropstart)&&e.off(N,i.cropstart),t.isFunction(i.cropmove)&&e.off(_,i.cropmove),t.isFunction(i.cropend)&&e.off(q,i.cropend),t.isFunction(i.crop)&&e.off(K,i.crop),t.isFunction(i.zoom)&&e.off(Z,i.zoom),s.off(z,this.cropStart),i.zoomable&&i.zoomOnWheel&&s.off(E,this.wheel),i.toggleDragModeOnDblclick&&s.off(U,this.dblclick),x.off(O,this._cropMove).off(P,this._cropEnd),i.responsive&&w.off(j,this._resize)},resize:function(){var i,e,s,a=this.options.restore,o=this.$container,h=this.container;!this.isDisabled&&h&&(s=o.width()/h.width,1===s&&o.height()===h.height||(a&&(i=this.getCanvasData(),e=this.getCropBoxData()),this.render(),a&&(this.setCanvasData(t.each(i,function(t,e){i[t]=e*s})),this.setCropBoxData(t.each(e,function(t,i){e[t]=i*s})))))},dblclick:function(){this.isDisabled||(this.$dragBox.hasClass(W)?this.setDragMode(dt):this.setDragMode(ct))},wheel:function(i){var e=i.originalEvent||i,s=vt(this.options.wheelZoomRatio)||.1,a=1;this.isDisabled||(i.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout(t.proxy(function(){this.wheeling=!1},this),50),e.deltaY?a=e.deltaY>0?1:-1:e.wheelDelta?a=-e.wheelDelta/120:e.detail&&(a=e.detail>0?1:-1),this.zoom(-a*s,i)))},cropStart:function(i){var e,s,a=this.options,o=i.originalEvent,h=o&&o.touches,n=i;if(!this.isDisabled){if(h){if(e=h.length,e>1){if(!a.zoomable||!a.zoomOnTouch||2!==e)return;n=h[1],this.startX2=n.pageX,this.startY2=n.pageY,s=gt}n=h[0]}if(s=s||t(n.target).data(it),Q.test(s)){if(this.trigger(N,{originalEvent:o,action:s}).isDefaultPrevented())return;i.preventDefault(),this.action=s,this.cropping=!1,this.startX=n.pageX||o&&o.pageX,this.startY=n.pageY||o&&o.pageY,s===ct&&(this.cropping=!0,this.$dragBox.addClass(T))}}},cropMove:function(t){var i,e=this.options,s=t.originalEvent,a=s&&s.touches,o=t,h=this.action;if(!this.isDisabled){if(a){if(i=a.length,i>1){if(!e.zoomable||!e.zoomOnTouch||2!==i)return;o=a[1],this.endX2=o.pageX,this.endY2=o.pageY}o=a[0]}if(h){if(this.trigger(_,{originalEvent:s,action:h}).isDefaultPrevented())return;t.preventDefault(),this.endX=o.pageX||s&&s.pageX,this.endY=o.pageY||s&&s.pageY,this.change(o.shiftKey,h===gt?t:null)}}},cropEnd:function(t){var i=t.originalEvent,e=this.action;this.isDisabled||e&&(t.preventDefault(),this.cropping&&(this.cropping=!1,this.$dragBox.toggleClass(T,this.isCropped&&this.options.modal)),this.action="",this.trigger(q,{originalEvent:i,action:e}))},change:function(t,i){var e,s,a=this.options,o=a.aspectRatio,h=this.action,n=this.container,r=this.canvas,p=this.cropBox,l=p.width,c=p.height,d=p.left,g=p.top,u=d+l,f=g+c,m=0,v=0,w=n.width,x=n.height,C=!0;switch(!o&&t&&(o=l&&c?l/c:1),this.isLimited&&(m=p.minLeft,v=p.minTop,w=m+wt(n.width,r.width,r.left+r.width),x=v+wt(n.height,r.height,r.top+r.height)),s={x:this.endX-this.startX,y:this.endY-this.startY},o&&(s.X=s.y*o,s.Y=s.x/o),h){case lt:d+=s.x,g+=s.y;break;case et:if(s.x>=0&&(u>=w||o&&(g<=v||f>=x))){C=!1;break}l+=s.x,o&&(c=l/o,g-=s.Y/2),l<0&&(h=st,l=0);break;case ot:if(s.y<=0&&(g<=v||o&&(d<=m||u>=w))){C=!1;break}c-=s.y,g+=s.y,o&&(l=c*o,d+=s.X/2),c<0&&(h=at,c=0);break;case st:if(s.x<=0&&(d<=m||o&&(g<=v||f>=x))){C=!1;break}l-=s.x,d+=s.x,o&&(c=l/o,g+=s.Y/2),l<0&&(h=et,l=0);break;case at:if(s.y>=0&&(f>=x||o&&(d<=m||u>=w))){C=!1;break}c+=s.y,o&&(l=c*o,d-=s.X/2),c<0&&(h=ot,c=0);break;case rt:if(o){if(s.y<=0&&(g<=v||u>=w)){C=!1;break}c-=s.y,g+=s.y,l=c*o}else s.x>=0?u<w?l+=s.x:s.y<=0&&g<=v&&(C=!1):l+=s.x,s.y<=0?g>v&&(c-=s.y,g+=s.y):(c-=s.y,g+=s.y);l<0&&c<0?(h=nt,c=0,l=0):l<0?(h=pt,l=0):c<0&&(h=ht,c=0);break;case pt:if(o){if(s.y<=0&&(g<=v||d<=m)){C=!1;break}c-=s.y,g+=s.y,l=c*o,d+=s.X}else s.x<=0?d>m?(l-=s.x,d+=s.x):s.y<=0&&g<=v&&(C=!1):(l-=s.x,d+=s.x),s.y<=0?g>v&&(c-=s.y,g+=s.y):(c-=s.y,g+=s.y);l<0&&c<0?(h=ht,c=0,l=0):l<0?(h=rt,l=0):c<0&&(h=nt,c=0);break;case nt:if(o){if(s.x<=0&&(d<=m||f>=x)){C=!1;break}l-=s.x,d+=s.x,c=l/o}else s.x<=0?d>m?(l-=s.x,d+=s.x):s.y>=0&&f>=x&&(C=!1):(l-=s.x,d+=s.x),s.y>=0?f<x&&(c+=s.y):c+=s.y;l<0&&c<0?(h=rt,c=0,l=0):l<0?(h=ht,l=0):c<0&&(h=pt,c=0);break;case ht:if(o){if(s.x>=0&&(u>=w||f>=x)){C=!1;break}l+=s.x,c=l/o}else s.x>=0?u<w?l+=s.x:s.y>=0&&f>=x&&(C=!1):l+=s.x,s.y>=0?f<x&&(c+=s.y):c+=s.y;l<0&&c<0?(h=pt,c=0,l=0):l<0?(h=nt,l=0):c<0&&(h=rt,c=0);break;case dt:this.move(s.x,s.y),C=!1;break;case gt:this.zoom(function(t,i,e,s){var a=yt(t*t+i*i),o=yt(e*e+s*s);return(o-a)/a}(Ct(this.startX-this.startX2),Ct(this.startY-this.startY2),Ct(this.endX-this.endX2),Ct(this.endY-this.endY2)),i),this.startX2=this.endX2,this.startY2=this.endY2,C=!1;break;case ct:if(!s.x||!s.y){C=!1;break}e=this.$cropper.offset(),d=this.startX-e.left,g=this.startY-e.top,l=p.minWidth,c=p.minHeight,s.x>0?h=s.y>0?ht:rt:s.x<0&&(d-=l,h=s.y>0?nt:pt),s.y<0&&(g-=c),this.isCropped||(this.$cropBox.removeClass(Y),this.isCropped=!0,this.isLimited&&this.limitCropBox(!0,!0))}C&&(p.width=l,p.height=c,p.left=d,p.top=g,this.action=h,this.renderCropBox()),this.startX=this.endX,this.startY=this.endY},crop:function(){this.isBuilt&&!this.isDisabled&&(this.isCropped||(this.isCropped=!0,this.limitCropBox(!0,!0),this.options.modal&&this.$dragBox.addClass(T),this.$cropBox.removeClass(Y)),this.setCropBoxData(this.initialCropBox))},reset:function(){this.isBuilt&&!this.isDisabled&&(this.image=t.extend({},this.initialImage),this.canvas=t.extend({},this.initialCanvas),this.cropBox=t.extend({},this.initialCropBox),this.renderCanvas(),this.isCropped&&this.renderCropBox())},clear:function(){this.isCropped&&!this.isDisabled&&(t.extend(this.cropBox,{left:0,top:0,width:0,height:0}),this.isCropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),this.$dragBox.removeClass(T),this.$cropBox.addClass(Y))},replace:function(t,i){!this.isDisabled&&t&&(this.isImg&&this.$element.attr("src",t),i?(this.url=t,this.$clone.attr("src",t),this.isBuilt&&this.$preview.find("img").add(this.$clone2).attr("src",t)):(this.isImg&&(this.isReplaced=!0),this.options.data=null,this.load(t)))},enable:function(){this.isBuilt&&(this.isDisabled=!1,this.$cropper.removeClass(H))},disable:function(){this.isBuilt&&(this.isDisabled=!0,this.$cropper.addClass(H))},destroy:function(){var t=this.$element;this.isLoaded?(this.isImg&&this.isReplaced&&t.attr("src",this.originalUrl),this.unbuild(),t.removeClass(Y)):this.isImg?t.off(I,this.start):this.$clone&&this.$clone.remove(),t.removeData(L)},move:function(t,i){var s=this.canvas;this.moveTo(e(t)?t:s.left+vt(t),e(i)?i:s.top+vt(i))},moveTo:function(t,s){var a=this.canvas,o=!1;e(s)&&(s=t),t=vt(t),s=vt(s),this.isBuilt&&!this.isDisabled&&this.options.movable&&(i(t)&&(a.left=t,o=!0),i(s)&&(a.top=s,o=!0),o&&this.renderCanvas(!0))},zoom:function(t,i){var e=this.canvas;t=vt(t),t=t<0?1/(1-t):1+t,this.zoomTo(e.width*t/e.naturalWidth,i)},zoomTo:function(t,i){var e,s,a,o,h,n=this.options,r=this.canvas,p=r.width,l=r.height,c=r.naturalWidth,g=r.naturalHeight;if(t=vt(t),t>=0&&this.isBuilt&&!this.isDisabled&&n.zoomable){if(s=c*t,a=g*t,i&&(e=i.originalEvent),this.trigger(Z,{originalEvent:e,oldRatio:p/c,ratio:s/c}).isDefaultPrevented())return;e?(o=this.$cropper.offset(),h=e.touches?d(e.touches):{pageX:i.pageX||e.pageX||0,pageY:i.pageY||e.pageY||0},r.left-=(s-p)*((h.pageX-o.left-r.left)/p),r.top-=(a-l)*((h.pageY-o.top-r.top)/l)):(r.left-=(s-p)/2,r.top-=(a-l)/2),r.width=s,r.height=a,this.renderCanvas(!0)}},rotate:function(t){this.rotateTo((this.image.rotate||0)+vt(t))},rotateTo:function(t){t=vt(t),i(t)&&this.isBuilt&&!this.isDisabled&&this.options.rotatable&&(this.image.rotate=t%360,this.isRotated=!0,this.renderCanvas(!0))},scale:function(t,s){var a=this.image,o=!1;e(s)&&(s=t),t=vt(t),s=vt(s),this.isBuilt&&!this.isDisabled&&this.options.scalable&&(i(t)&&(a.scaleX=t,o=!0),i(s)&&(a.scaleY=s,o=!0),o&&this.renderImage(!0))},scaleX:function(t){var e=this.image.scaleY;this.scale(t,i(e)?e:1)},scaleY:function(t){var e=this.image.scaleX;this.scale(i(e)?e:1,t)},getData:function(i){var e,s,a=this.options,o=this.image,h=this.canvas,n=this.cropBox;return this.isBuilt&&this.isCropped?(s={x:n.left-h.left,y:n.top-h.top,width:n.width,height:n.height},e=o.width/o.naturalWidth,t.each(s,function(t,a){a/=e,s[t]=i?Dt(a):a})):s={x:0,y:0,width:0,height:0},a.rotatable&&(s.rotate=o.rotate||0),a.scalable&&(s.scaleX=o.scaleX||1,s.scaleY=o.scaleY||1),s},setData:function(e){var s,a,o,h=this.options,n=this.image,r=this.canvas,p={};t.isFunction(e)&&(e=e.call(this.element)),this.isBuilt&&!this.isDisabled&&t.isPlainObject(e)&&(h.rotatable&&i(e.rotate)&&e.rotate!==n.rotate&&(n.rotate=e.rotate,this.isRotated=s=!0),h.scalable&&(i(e.scaleX)&&e.scaleX!==n.scaleX&&(n.scaleX=e.scaleX,a=!0),i(e.scaleY)&&e.scaleY!==n.scaleY&&(n.scaleY=e.scaleY,a=!0)),s?this.renderCanvas():a&&this.renderImage(),o=n.width/n.naturalWidth,i(e.x)&&(p.left=e.x*o+r.left),i(e.y)&&(p.top=e.y*o+r.top),i(e.width)&&(p.width=e.width*o),i(e.height)&&(p.height=e.height*o),this.setCropBoxData(p))},getContainerData:function(){return this.isBuilt?this.container:{}},getImageData:function(){return this.isLoaded?this.image:{}},getCanvasData:function(){var i=this.canvas,e={};return this.isBuilt&&t.each(["left","top","width","height","naturalWidth","naturalHeight"],function(t,s){e[s]=i[s]}),e},setCanvasData:function(e){var s=this.canvas,a=s.aspectRatio;t.isFunction(e)&&(e=e.call(this.$element)),this.isBuilt&&!this.isDisabled&&t.isPlainObject(e)&&(i(e.left)&&(s.left=e.left),i(e.top)&&(s.top=e.top),i(e.width)?(s.width=e.width,s.height=e.width/a):i(e.height)&&(s.height=e.height,s.width=e.height*a),this.renderCanvas(!0))},getCropBoxData:function(){var t,i=this.cropBox;return this.isBuilt&&this.isCropped&&(t={left:i.left,top:i.top,width:i.width,height:i.height}),t||{}},setCropBoxData:function(e){var s,a,o=this.cropBox,h=this.options.aspectRatio;t.isFunction(e)&&(e=e.call(this.$element)),this.isBuilt&&this.isCropped&&!this.isDisabled&&t.isPlainObject(e)&&(i(e.left)&&(o.left=e.left),i(e.top)&&(o.top=e.top),i(e.width)&&(s=!0,o.width=e.width),i(e.height)&&(a=!0,o.height=e.height),h&&(s?o.height=o.width/h:a&&(o.width=o.height*h)),this.renderCropBox())},getCroppedCanvas:function(i){var e,s,a,o,h,n,r,p,l,d,g;if(this.isBuilt&&ft)return this.isCropped?(t.isPlainObject(i)||(i={}),g=this.getData(),e=g.width,s=g.height,p=e/s,t.isPlainObject(i)&&(h=i.width,n=i.height,h?(n=h/p,r=h/e):n&&(h=n*p,r=n/s)),a=$t(h||e),o=$t(n||s),l=t("<canvas>")[0],l.width=a,l.height=o,d=l.getContext("2d"),i.fillColor&&(d.fillStyle=i.fillColor,d.fillRect(0,0,a,o)),d.drawImage.apply(d,function(){var t,i,a,o,h,n,p=c(this.$clone[0],this.image),l=p.width,d=p.height,u=this.canvas,f=[p],m=g.x+u.naturalWidth*(Ct(g.scaleX||1)-1)/2,v=g.y+u.naturalHeight*(Ct(g.scaleY||1)-1)/2;return m<=-e||m>l?m=t=a=h=0:m<=0?(a=-m,m=0,t=h=wt(l,e+m)):m<=l&&(a=0,t=h=wt(e,l-m)),t<=0||v<=-s||v>d?v=i=o=n=0:v<=0?(o=-v,v=0,i=n=wt(d,s+v)):v<=d&&(o=0,i=n=wt(s,d-v)),f.push($t(m),$t(v),$t(t),$t(i)),r&&(a*=r,o*=r,h*=r,n*=r),h>0&&n>0&&f.push($t(a),$t(o),$t(h),$t(n)),f}.call(this)),l):c(this.$clone[0],this.image)},setAspectRatio:function(t){var i=this.options;this.isDisabled||e(t)||(i.aspectRatio=xt(0,t)||NaN,this.isBuilt&&(this.initCropBox(),this.isCropped&&this.renderCropBox()))},setDragMode:function(t){var i,e,s=this.options;this.isLoaded&&!this.isDisabled&&(i=t===ct,e=s.movable&&t===dt,t=i||e?t:ut,this.$dragBox.data(it,t).toggleClass(W,i).toggleClass(M,e),s.cropBoxMovable||this.$face.data(it,t).toggleClass(W,i).toggleClass(M,e))}},v.DEFAULTS={viewMode:0,dragMode:"crop",aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:200,minContainerHeight:100,build:null,built:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},v.setDefaults=function(i){t.extend(v.DEFAULTS,i)},v.TEMPLATE='<div class="cropper-container"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-action="e"></span><span class="cropper-line line-n" data-action="n"></span><span class="cropper-line line-w" data-action="w"></span><span class="cropper-line line-s" data-action="s"></span><span class="cropper-point point-e" data-action="e"></span><span class="cropper-point point-n" data-action="n"></span><span class="cropper-point point-w" data-action="w"></span><span class="cropper-point point-s" data-action="s"></span><span class="cropper-point point-ne" data-action="ne"></span><span class="cropper-point point-nw" data-action="nw"></span><span class="cropper-point point-sw" data-action="sw"></span><span class="cropper-point point-se" data-action="se"></span></div></div>',v.other=t.fn.cropper,t.fn.cropper=function(i){var a,o=s(arguments,1);return this.each(function(){var e,s,h=t(this),n=h.data(L);if(!n){if(/destroy/.test(i))return;e=t.extend({},h.data(),t.isPlainObject(i)&&i),h.data(L,n=new v(this,e))}"string"==typeof i&&t.isFunction(s=n[i])&&(a=s.apply(n,o))}),e(a)?this:a},t.fn.cropper.Constructor=v,t.fn.cropper.setDefaults=v.setDefaults,t.fn.cropper.noConflict=function(){return t.fn.cropper=v.other,this}});
window.fbAsyncInit = function() {
  //1947660855514393 1645055635737772 kris sadewo //225385801228932

  FB.init({
    appId            : '836518019843190',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return-1==n.indexOf(t)&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return-1!=n&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=0,o=i[n];t=t||[];for(var r=this._onceEvents&&this._onceEvents[e];o;){var s=r&&r[o];s&&(this.off(e,o),delete r[o]),o.apply(this,t),n+=s?0:1,o=i[n]}return this}},t.allOff=t.removeAllListeners=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){var t=[];if(Array.isArray(e))t=e;else if("number"==typeof e.length)for(var i=0;i<e.length;i++)t.push(e[i]);else t.push(e);return t}function o(e,t,r){return this instanceof o?("string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=n(e),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(e,t,r)}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&d[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

/*!
 * jQuery Migrate - v3.0.0 - 2016-06-09
 * Copyright jQuery Foundation and other contributors
 */
(function( jQuery, window ) {
  "use strict";


  jQuery.migrateVersion = "3.0.0";


  ( function() {

    // Support: IE9 only
    // IE9 only creates console object when dev tools are first opened
    // Also, avoid Function#bind here to simplify PhantomJS usage
    var log = window.console && window.console.log &&
        function() { window.console.log.apply( window.console, arguments ); },
      rbadVersions = /^[12]\./;

    if ( !log ) {
      return;
    }

    // Need jQuery 3.0.0+ and no older Migrate loaded
    if ( !jQuery || rbadVersions.test( jQuery.fn.jquery ) ) {
      log( "JQMIGRATE: jQuery 3.0.0+ REQUIRED" );
    }
    if ( jQuery.migrateWarnings ) {
      log( "JQMIGRATE: Migrate plugin loaded multiple times" );
    }

    // Show a message on the console so devs know we're active
    log( "JQMIGRATE: Migrate is installed" +
      ( jQuery.migrateMute ? "" : " with logging active" ) +
      ", version " + jQuery.migrateVersion );

  } )();

  var warnedAbout = {};

// List of warnings already given; public read only
  jQuery.migrateWarnings = [];

// Set to false to disable traces that appear with warnings
  if ( jQuery.migrateTrace === undefined ) {
    jQuery.migrateTrace = true;
  }

// Forget any warnings we've already given; public
  jQuery.migrateReset = function() {
    warnedAbout = {};
    jQuery.migrateWarnings.length = 0;
  };

  function migrateWarn( msg ) {
    var console = window.console;
    if ( !warnedAbout[ msg ] ) {
      warnedAbout[ msg ] = true;
      jQuery.migrateWarnings.push( msg );
      if ( console && console.warn && !jQuery.migrateMute ) {
        console.warn( "JQMIGRATE: " + msg );
        if ( jQuery.migrateTrace && console.trace ) {
          console.trace();
        }
      }
    }
  }

  function migrateWarnProp( obj, prop, value, msg ) {
    Object.defineProperty( obj, prop, {
      configurable: true,
      enumerable: true,
      get: function() {
        migrateWarn( msg );
        return value;
      }
    } );
  }

  if ( document.compatMode === "BackCompat" ) {

    // JQuery has never supported or tested Quirks Mode
    migrateWarn( "jQuery is not compatible with Quirks Mode" );
  }


  var oldInit = jQuery.fn.init,
    oldIsNumeric = jQuery.isNumeric,
    oldFind = jQuery.find,
    rattrHashTest = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
    rattrHashGlob = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g;

  jQuery.fn.init = function( arg1 ) {
    var args = Array.prototype.slice.call( arguments );

    if ( typeof arg1 === "string" && arg1 === "#" ) {

      // JQuery( "#" ) is a bogus ID selector, but it returned an empty set before jQuery 3.0
      migrateWarn( "jQuery( '#' ) is not a valid selector" );
      args[ 0 ] = [];
    }

    return oldInit.apply( this, args );
  };
  jQuery.fn.init.prototype = jQuery.fn;

  jQuery.find = function( selector ) {
    var args = Array.prototype.slice.call( arguments );

    // Support: PhantomJS 1.x
    // String#match fails to match when used with a //g RegExp, only on some strings
    if ( typeof selector === "string" && rattrHashTest.test( selector ) ) {

      // The nonstandard and undocumented unquoted-hash was removed in jQuery 1.12.0
      // First see if qS thinks it's a valid selector, if so avoid a false positive
      try {
        document.querySelector( selector );
      } catch ( err1 ) {

        // Didn't *look* valid to qSA, warn and try quoting what we think is the value
        selector = selector.replace( rattrHashGlob, function( _, attr, op, value ) {
          return "[" + attr + op + "\"" + value + "\"]";
        } );

        // If the regexp *may* have created an invalid selector, don't update it
        // Note that there may be false alarms if selector uses jQuery extensions
        try {
          document.querySelector( selector );
          migrateWarn( "Attribute selector with '#' must be quoted: " + args[ 0 ] );
          args[ 0 ] = selector;
        } catch ( err2 ) {
          migrateWarn( "Attribute selector with '#' was not fixed: " + args[ 0 ] );
        }
      }
    }

    return oldFind.apply( this, args );
  };

// Copy properties attached to original jQuery.find method (e.g. .attr, .isXML)
  var findProp;
  for ( findProp in oldFind ) {
    if ( Object.prototype.hasOwnProperty.call( oldFind, findProp ) ) {
      jQuery.find[ findProp ] = oldFind[ findProp ];
    }
  }

// The number of elements contained in the matched element set
  jQuery.fn.size = function() {
    migrateWarn( "jQuery.fn.size() is deprecated; use the .length property" );
    return this.length;
  };

  jQuery.parseJSON = function() {
    migrateWarn( "jQuery.parseJSON is deprecated; use JSON.parse" );
    return JSON.parse.apply( null, arguments );
  };

  jQuery.isNumeric = function( val ) {

    // The jQuery 2.2.3 implementation of isNumeric
    function isNumeric2( obj ) {
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
    }

    var newValue = oldIsNumeric( val ),
      oldValue = isNumeric2( val );

    if ( newValue !== oldValue ) {
      migrateWarn( "jQuery.isNumeric() should not be called on constructed objects" );
    }

    return oldValue;
  };

  migrateWarnProp( jQuery, "unique", jQuery.uniqueSort,
    "jQuery.unique is deprecated, use jQuery.uniqueSort" );

// Now jQuery.expr.pseudos is the standard incantation
  migrateWarnProp( jQuery.expr, "filters", jQuery.expr.pseudos,
    "jQuery.expr.filters is now jQuery.expr.pseudos" );
  migrateWarnProp( jQuery.expr, ":", jQuery.expr.pseudos,
    "jQuery.expr[\":\"] is now jQuery.expr.pseudos" );


  var oldAjax = jQuery.ajax;

  jQuery.ajax = function( ) {
    var jQXHR = oldAjax.apply( this, arguments );

    // Be sure we got a jQXHR (e.g., not sync)
    if ( jQXHR.promise ) {
      migrateWarnProp( jQXHR, "success", jQXHR.done,
        "jQXHR.success is deprecated and removed" );
      migrateWarnProp( jQXHR, "error", jQXHR.fail,
        "jQXHR.error is deprecated and removed" );
      migrateWarnProp( jQXHR, "complete", jQXHR.always,
        "jQXHR.complete is deprecated and removed" );
    }

    return jQXHR;
  };


  var oldRemoveAttr = jQuery.fn.removeAttr,
    oldToggleClass = jQuery.fn.toggleClass,
    rmatchNonSpace = /\S+/g;

  jQuery.fn.removeAttr = function( name ) {
    var self = this;

    jQuery.each( name.match( rmatchNonSpace ), function( i, attr ) {
      if ( jQuery.expr.match.bool.test( attr ) ) {
        migrateWarn( "jQuery.fn.removeAttr no longer sets boolean properties: " + attr );
        self.prop( attr, false );
      }
    } );

    return oldRemoveAttr.apply( this, arguments );
  };

  jQuery.fn.toggleClass = function( state ) {

    // Only deprecating no-args or single boolean arg
    if ( state !== undefined && typeof state !== "boolean" ) {
      return oldToggleClass.apply( this, arguments );
    }

    migrateWarn( "jQuery.fn.toggleClass( boolean ) is deprecated" );

    // Toggle entire class name of each element
    return this.each( function() {
      var className = this.getAttribute && this.getAttribute( "class" ) || "";

      if ( className ) {
        jQuery.data( this, "__className__", className );
      }

      // If the element has a class name or if we're passed `false`,
      // then remove the whole classname (if there was one, the above saved it).
      // Otherwise bring back whatever was previously saved (if anything),
      // falling back to the empty string if nothing was stored.
      if ( this.setAttribute ) {
        this.setAttribute( "class",
          className || state === false ?
            "" :
            jQuery.data( this, "__className__" ) || ""
        );
      }
    } );
  };


  var internalSwapCall = false;

// If this version of jQuery has .swap(), don't false-alarm on internal uses
  if ( jQuery.swap ) {
    jQuery.each( [ "height", "width", "reliableMarginRight" ], function( _, name ) {
      var oldHook = jQuery.cssHooks[ name ] && jQuery.cssHooks[ name ].get;

      if ( oldHook ) {
        jQuery.cssHooks[ name ].get = function() {
          var ret;

          internalSwapCall = true;
          ret = oldHook.apply( this, arguments );
          internalSwapCall = false;
          return ret;
        };
      }
    } );
  }

  jQuery.swap = function( elem, options, callback, args ) {
    var ret, name,
      old = {};

    if ( !internalSwapCall ) {
      migrateWarn( "jQuery.swap() is undocumented and deprecated" );
    }

    // Remember the old values, and insert the new ones
    for ( name in options ) {
      old[ name ] = elem.style[ name ];
      elem.style[ name ] = options[ name ];
    }

    ret = callback.apply( elem, args || [] );

    // Revert the old values
    for ( name in options ) {
      elem.style[ name ] = old[ name ];
    }

    return ret;
  };

  var oldData = jQuery.data;

  jQuery.data = function( elem, name, value ) {
    var curData;

    // If the name is transformed, look for the un-transformed name in the data object
    if ( name && name !== jQuery.camelCase( name ) ) {
      curData = jQuery.hasData( elem ) && oldData.call( this, elem );
      if ( curData && name in curData ) {
        migrateWarn( "jQuery.data() always sets/gets camelCased names: " + name );
        if ( arguments.length > 2 ) {
          curData[ name ] = value;
        }
        return curData[ name ];
      }
    }

    return oldData.apply( this, arguments );
  };

  var oldTweenRun = jQuery.Tween.prototype.run;

  jQuery.Tween.prototype.run = function( percent ) {
    if ( jQuery.easing[ this.easing ].length > 1 ) {
      migrateWarn(
        "easing function " +
        "\"jQuery.easing." + this.easing.toString() +
        "\" should use only first argument"
      );

      jQuery.easing[ this.easing ] = jQuery.easing[ this.easing ].bind(
        jQuery.easing,
        percent, this.options.duration * percent, 0, 1, this.options.duration
      );
    }

    oldTweenRun.apply( this, arguments );
  };

  var oldLoad = jQuery.fn.load,
    originalFix = jQuery.event.fix;

  jQuery.event.props = [];
  jQuery.event.fixHooks = {};

  jQuery.event.fix = function( originalEvent ) {
    var event,
      type = originalEvent.type,
      fixHook = this.fixHooks[ type ],
      props = jQuery.event.props;

    if ( props.length ) {
      migrateWarn( "jQuery.event.props are deprecated and removed: " + props.join() );
      while ( props.length ) {
        jQuery.event.addProp( props.pop() );
      }
    }

    if ( fixHook && !fixHook._migrated_ ) {
      fixHook._migrated_ = true;
      migrateWarn( "jQuery.event.fixHooks are deprecated and removed: " + type );
      if ( ( props = fixHook.props ) && props.length ) {
        while ( props.length ) {
          jQuery.event.addProp( props.pop() );
        }
      }
    }

    event = originalFix.call( this, originalEvent );

    return fixHook && fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
  };

  jQuery.each( [ "load", "unload", "error" ], function( _, name ) {

    jQuery.fn[ name ] = function() {
      var args = Array.prototype.slice.call( arguments, 0 );

      // If this is an ajax load() the first arg should be the string URL;
      // technically this could also be the "Anything" arg of the event .load()
      // which just goes to show why this dumb signature has been deprecated!
      // jQuery custom builds that exclude the Ajax module justifiably die here.
      if ( name === "load" && typeof args[ 0 ] === "string" ) {
        return oldLoad.apply( this, args );
      }

      migrateWarn( "jQuery.fn." + name + "() is deprecated" );

      args.splice( 0, 0, name );
      if ( arguments.length ) {
        return this.on.apply( this, args );
      }

      // Use .triggerHandler here because:
      // - load and unload events don't need to bubble, only applied to window or image
      // - error event should not bubble to window, although it does pre-1.7
      // See http://bugs.jquery.com/ticket/11820
      this.triggerHandler.apply( this, args );
      return this;
    };

  } );

// Trigger "ready" event only once, on document ready
  jQuery( function() {
    jQuery( document ).triggerHandler( "ready" );
  } );

  jQuery.event.special.ready = {
    setup: function() {
      if ( this === document ) {
        migrateWarn( "'ready' event is deprecated" );
      }
    }
  };

  jQuery.fn.extend( {

    bind: function( types, data, fn ) {
      migrateWarn( "jQuery.fn.bind() is deprecated" );
      return this.on( types, null, data, fn );
    },
    unbind: function( types, fn ) {
      migrateWarn( "jQuery.fn.unbind() is deprecated" );
      return this.off( types, null, fn );
    },
    delegate: function( selector, types, data, fn ) {
      migrateWarn( "jQuery.fn.delegate() is deprecated" );
      return this.on( types, selector, data, fn );
    },
    undelegate: function( selector, types, fn ) {
      migrateWarn( "jQuery.fn.undelegate() is deprecated" );
      return arguments.length === 1 ?
        this.off( selector, "**" ) :
        this.off( types, selector || "**", fn );
    }
  } );


  var oldOffset = jQuery.fn.offset;

  jQuery.fn.offset = function() {
    var docElem,
      elem = this[ 0 ],
      origin = { top: 0, left: 0 };

    if ( !elem || !elem.nodeType ) {
      migrateWarn( "jQuery.fn.offset() requires a valid DOM element" );
      return origin;
    }

    docElem = ( elem.ownerDocument || document ).documentElement;
    if ( !jQuery.contains( docElem, elem ) ) {
      migrateWarn( "jQuery.fn.offset() requires an element connected to a document" );
      return origin;
    }

    return oldOffset.apply( this, arguments );
  };


  var oldParam = jQuery.param;

  jQuery.param = function( data, traditional ) {
    var ajaxTraditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;

    if ( traditional === undefined && ajaxTraditional ) {

      migrateWarn( "jQuery.param() no longer uses jQuery.ajaxSettings.traditional" );
      traditional = ajaxTraditional;
    }

    return oldParam.call( this, data, traditional );
  };

  var oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack;

  jQuery.fn.andSelf = function() {
    migrateWarn( "jQuery.fn.andSelf() replaced by jQuery.fn.addBack()" );
    return oldSelf.apply( this, arguments );
  };


  var oldDeferred = jQuery.Deferred,
    tuples = [

      // Action, add listener, callbacks, .then handlers, final state
      [ "resolve", "done", jQuery.Callbacks( "once memory" ),
        jQuery.Callbacks( "once memory" ), "resolved" ],
      [ "reject", "fail", jQuery.Callbacks( "once memory" ),
        jQuery.Callbacks( "once memory" ), "rejected" ],
      [ "notify", "progress", jQuery.Callbacks( "memory" ),
        jQuery.Callbacks( "memory" ) ]
    ];

  jQuery.Deferred = function( func ) {
    var deferred = oldDeferred(),
      promise = deferred.promise();

    deferred.pipe = promise.pipe = function( /* fnDone, fnFail, fnProgress */ ) {
      var fns = arguments;

      migrateWarn( "deferred.pipe() is deprecated" );

      return jQuery.Deferred( function( newDefer ) {
        jQuery.each( tuples, function( i, tuple ) {
          var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

          // Deferred.done(function() { bind to newDefer or newDefer.resolve })
          // deferred.fail(function() { bind to newDefer or newDefer.reject })
          // deferred.progress(function() { bind to newDefer or newDefer.notify })
          deferred[ tuple[ 1 ] ]( function() {
            var returned = fn && fn.apply( this, arguments );
            if ( returned && jQuery.isFunction( returned.promise ) ) {
              returned.promise()
                .done( newDefer.resolve )
                .fail( newDefer.reject )
                .progress( newDefer.notify );
            } else {
              newDefer[ tuple[ 0 ] + "With" ](
                this === promise ? newDefer.promise() : this,
                fn ? [ returned ] : arguments
              );
            }
          } );
        } );
        fns = null;
      } ).promise();

    };

    if ( func ) {
      func.call( deferred, deferred );
    }

    return deferred;
  };



})( jQuery, window );

/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la), Lanre Adebambo
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.7
 *
 */
(function($) {

  $.fn.extend({
    slimScroll: function(options) {

      var defaults = {

        // axis to apply scrollbars x(X) / y(Y) / both
        axis: 'y',

        // width in pixels of the visible scroll area
        width : 'auto',

        // height in pixels of the visible scroll area
        height : '250px',

        // width in pixels of the scrollbar and rail
        size : '7px',

        // scrollbar color, accepts any hex/color value
        color: '#000',

        // scrollbar position - top/bottom
        positionX : 'bottom',

        // scrollbar position - left/right
        positionY : 'right',

        // distance in pixels between the side edge and the scrollbar
        distance : '1px',

        // default scroll position on load - left/right / $('selector')
        startX : 'left',

        // default scroll position on load - top / bottom / $('selector')
        startY : 'top',

        // sets scrollbar opacity
        opacity : 0.4,

        // enables always-on mode for the scrollbar
        alwaysVisible : false,

        // check if we should hide the scrollbar when user is hovering over
        disableFadeOut : false,

        // sets visibility of the rail
        railVisible : false,

        // sets rail color
        railColor : '#333',

        // sets rail opacity
        railOpacity : 0.2,

        // whether  we should use jQuery UI Draggable to enable bar dragging
        railDraggable : true,

        // defautlt CSS class of the slimscroll rail in X axis
        railClassX : 'slimScrollRailX',

        // defautlt CSS class of the slimscroll bar in X Axis
        barClassX : 'slimScrollBarX',

        // defautlt CSS class of the slimscroll rail in Y axis
        railClassY : 'slimScrollRailY',

        // defautlt CSS class of the slimscroll bar in Y axis
        barClassY : 'slimScrollBarY',

        // defautlt CSS class of the slimscroll wrapper
        wrapperClass : 'slimScrollDiv',

        // check if mousewheel should scroll the window if we reach top/bottom
        allowPageScroll : false,

        // check if force vertical movement of mousewheel to scroll a area whose axis is 'x'
        applyVerticalWheelToHorizontal : false,

        // scroll amount applied to each mouse wheel step
        wheelStep : 20,

        // scroll amount applied when user is using gestures
        touchScrollStep : 200,

        // sets border radius
        borderRadius: '7px',

        // sets border radius of the rail
        railBorderRadius : '7px'
      };

      var o = $.extend(defaults, options);

      // normalize to lower case for ease of handling
      o.axis = o.axis.toLowerCase();

      // do it for every element that matches selector
      this.each(function(){
      var hasHorizontalScrollbar;
      var hasVerticalScrollbar;
      var t, pageX, pageY;
      var isOverPanel, isOverBarX, isOverBarY, isDragg, queueHideX, queueHideY, touchDifX, touchDifY,
        barHeight, barWidth, percentScrollX, lastScrollX, percentScrollY, lastScrollY,
        divS = '<div></div>',
        minBarHeight = 30,
        minBarWidth = 30,
        releaseScroll = false;

        // used in event handlers and for better minification
        var me = $(this);
        var $doc = $(document);

        // ensure we are not binding it again
        if (me.parent().hasClass(o.wrapperClass))
        {
            $.extend(o, (me.data('slimScrollConfig') || {})); //retrieve previous config
            // start from last bar position
            var offset_horizontal = me.scrollLeft();
            var offset_vertical = me.scrollTop();

            // find bar and rail
            barX = me.siblings('.' + o.barClassX);
            railX = me.siblings('.' + o.railClassX);
            barY = me.siblings('.' + o.barClassY);
            railY = me.siblings('.' + o.railClassY);

            //check that scroll bars are enabled
            hasHorizontalScrollbar = (o.axis == 'both' || o.axis == 'x');
            hasVerticalScrollbar = (o.axis == 'both' || o.axis == 'y');

            getBarXWidth();
            getBarYHeight();

            // check if we should scroll existing instance
            if ($.isPlainObject(options))
            {

              // Pass width: auto to an existing slimscroll object to force a resize after contents have changed
              if ( 'width' in options && hasHorizontalScrollbar) {
                if (options.width == 'auto') {
                  me.parent().css('width', 'auto');
                  me.css('width', 'auto');
                  o.width = me.parent().parent().width();
                }
                else {
                  o.width = options.width;
                  me.css({'white-space': 'nowrap'});
                }
              }

              // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
              if ( 'height' in options && hasVerticalScrollbar) {
                if(options.height == 'auto'){
                  me.parent().css('height', 'auto');
                  me.css('height', 'auto');
                  o.height = me.parent().parent().height();
                } else {
                  o.height = options.height;
                }
              }

              // rewrap content
              me.parent().css({
                  position: 'relative',
                  overflow: 'hidden',
                  width: o.width,
                  height: o.height
                });

              // update style for the div
              me.css({
                overflow: 'hidden',
                width: o.width,
                height: o.height
              });

              if ('scrollToX' in options)
              {
                // jump to a static point
                offset_horizontal = parseInt(o.scrollToX);
              }
              else if ('scrollByX' in options)
              {
                // jump by value pixels
                offset_horizontal += parseInt(o.scrollByX);
              }
              if ('scrollToY' in options)
              {
                // jump to a static point
                offset_vertical = parseInt(o.scrollToY);
              }
              else if ('scrollByY' in options)
              {
                // jump by value pixels
                offset_vertical += parseInt(o.scrollByY);
              }

              if ('destroy' in options)
              {
                // remove slimscroll elements
                barX.remove();
                railX.remove();
                barY.remove();
                railY.remove();
                me.unwrap();
                return;
              }
            }
            // scroll content by the given offset
            scrollContent(offset_horizontal, offset_vertical, false, true);

            return;
        }
        else if ($.isPlainObject(options))
        {
            if ('destroy' in options)
            {
            	return;
            }
        }

        //check that scroll bars are enabled
        hasHorizontalScrollbar = (o.axis == 'both' || o.axis == 'x');
        hasVerticalScrollbar = (o.axis == 'both' || o.axis == 'y');

        // optionally set height/width to the parent's height/width
        o.height = (o.height == 'auto') ? me.parent().height() : o.height;
        o.width = (o.width == 'auto') ? me.parent().width() : o.width;

        //store options in DOM
        me.data('slimScrollConfig', o);

        // wrap content
        var wrapper = $(divS)
          .addClass(o.wrapperClass)
          .css({
            position: 'relative',
            overflow: 'hidden',
            width: o.width,
            height: o.height
          });

        // update style for the div
        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // wrap it
        me.wrap(wrapper);


        if(hasHorizontalScrollbar){
          // if width is specified remove wrapping from text
          if(o.width != 'auto' && hasHorizontalScrollbar){
            me.css({'white-space': 'nowrap'});
          }

          // create scrollbar rail
          var railX = $(divS)
            .addClass(o.railClassX)
            .css({
              width: '100%',
              height: o.size,
              position: 'absolute',
              left: 0,
              display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
              'border-radius': o.railBorderRadius,
              background: o.railColor,
              opacity: o.railOpacity,
              zIndex: 90
            });

          // create scrollbar
          var barX = $(divS)
            .addClass(o.barClassX)
            .css({
              background: o.color,
              height: o.size,
              position: 'absolute',
              left: 0,
              opacity: o.opacity,
              display: o.alwaysVisible ? 'block' : 'none',
              'border-radius' : o.borderRadius,
              BorderRadius: o.borderRadius,
              MozBorderRadius: o.borderRadius,
              WebkitBorderRadius: o.borderRadius,
              zIndex: 99
            });

          // set position
          var xPosCss = (o.positionX == 'top') ? { top: o.distance } : { bottom: o.distance };
          railX.css(xPosCss);
          barX.css(xPosCss);

          // append to parent div
          me.parent().append(barX);
          me.parent().append(railX);

          // make it draggable and no longer dependent on the jqueryUI
          if(o.railDraggable){
            barX.on("mousedown", function(e) {
              isDragg = true;
              t = parseFloat(barX.css('left'));
              pageX = e.pageX;

              $doc.on("mousemove.slimscrollX", function(e){
                currLeft = t + e.pageX - pageX;
                barX.css('left', currLeft);
                scrollContent(0, 0, barX.position().left);// scroll content
              });

              $doc.on("mouseup.slimscrollX", function(e) {
                isDragg = false;
                hideBarX();
                $doc.unbind('.slimscrollX');
              });
              return false;
            }).on("selectstart.slimscrollX", function(e){
              e.stopPropagation();
              e.preventDefault();
              return false;
            });

            railX.on("mousedown", function(e){
              var deltaX = (e.offsetX - (barWidth/2))* me[0].scrollWidth / me.outerWidth();
              scrollContent(deltaX, 0, false, true);// scroll content
              t = parseFloat(barX.css('left'));
              pageX = e.pageX;

              $doc.on("mousemove.slimscrollX", function(e){
                currLeft = t + e.pageX - pageX;
                barX.css('left', currLeft);
                scrollContent(0, 0, barX.position().left);// scroll content
              });

              $doc.on("mouseup.slimscrollX", function(e) {
                isDragg = false;
                hideBarX();
                $doc.unbind('.slimscrollX');
              });
              return false;
            });
          }

          // on rail over
          railX.hover(function(){
            showBarX();
          }, function(){
            hideBarX();
          });

          // on bar over
          barX.hover(function(){
            isOverBarX = true;
          }, function(){
            isOverBarX = false;
          });

          // set up initial width and height
          getBarXWidth();

          // check start position
          if (o.startX === 'right')
          {
            // scroll content to rigth
            barX.css({ left: me.outerWidth() - barX.outerWidth() });
            scrollContent(0, 0, true);
          }
          else if (o.startX !== 'left')
          {
            // assume jQuery selector
            scrollContent($(o.startX).position().left, null, null, true);

            // make sure bar stays hidden
            if (!o.alwaysVisible) { barX.hide(); }
          }

        }


        if(hasVerticalScrollbar){
          // create scrollbar rail
          var railY = $(divS)
            .addClass(o.railClassY)
            .css({
              width: o.size,
              height: '100%',
              position: 'absolute',
              top: 0,
              display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
              'border-radius': o.railBorderRadius,
              background: o.railColor,
              opacity: o.railOpacity,
              zIndex: 90
            });

          // create scrollbar
          var barY = $(divS)
            .addClass(o.barClassY)
            .css({
              background: o.color,
              width: o.size,
              position: 'absolute',
              top: 0,
              opacity: o.opacity,
              display: o.alwaysVisible ? 'block' : 'none',
              'border-radius' : o.borderRadius,
              BorderRadius: o.borderRadius,
              MozBorderRadius: o.borderRadius,
              WebkitBorderRadius: o.borderRadius,
              zIndex: 99
            });

          var yPosCss = (o.positionY == 'right') ? { right: o.distance } : { left: o.distance };
          railY.css(yPosCss);
          barY.css(yPosCss);

          me.parent().append(barY);
          me.parent().append(railY);

          if(o.railDraggable){
            barY.on("mousedown", function(e) {
              isDragg = true;
              t = parseFloat(barY.css('top'));
              pageY = e.pageY;

              $doc.on("mousemove.slimscrollY", function(e){
                currTop = t + e.pageY - pageY;
                barY.css('top', currTop);
                scrollContent(0, 0, barY.position().top);// scroll content
              });

              $doc.on("mouseup.slimscrollY", function(e) {
                isDragg = false;
                hideBarY();
                $doc.unbind('.slimscrollY');
              });
              return false;
            }).on("selectstart.slimscrollY", function(e){
              e.stopPropagation();
              e.preventDefault();
              return false;
            });

            railY.on("mousedown", function(e){
              var deltaY = (e.offsetY - (barHeight/2))* me[0].scrollHeight / me.outerHeight();
              scrollContent(0, deltaY, false, true);// scroll content
              t = parseFloat(barY.css('top'));
              pageY = e.pageY;

              $doc.on("mousemove.slimscrollY", function(e){
                currTop = t + e.pageY - pageY;
                barY.css('top', currTop);
                scrollContent(0, 0, barY.position().top);// scroll content
              });

              $doc.on("mouseup.slimscrollY", function(e) {
                isDragg = false;
                hideBarY();
                $doc.unbind('.slimscrollY');
              });
              return false;
            });
          }

          // on rail over
          railY.hover(function(){
            showBarY();
          }, function(){
            hideBarY();
          });

          // on bar over
          barY.hover(function(){
            isOverBarY = true;
          }, function(){
            isOverBarY = false;
          });

          getBarYHeight();

          if (o.startY === 'bottom')
          {
            // scroll content to bottom
            barY.css({ top: me.outerHeight() - barY.outerHeight() });
            scrollContent(0, 0, true);
          }
          else if (o.startY !== 'top')
          {
            // assume jQuery selector
            scrollContent(null, $(o.startY).position().top, null, true);

            // make sure bar stays hidden
            if (!o.alwaysVisible) { barY.hide(); }
          }

        }

        // show on parent mouseover
        me.hover(function(){
          isOverPanel = true;
          showBarX();
          showBarY();
          hideBarX();
          hideBarY();
        }, function(){
          isOverPanel = false;
          hideBarX();
          hideBarY();
        });

        // support for mobile
        me.on('touchstart', function(e,b){
          if (e.originalEvent.touches.length)
          {
            // record where touch started
            touchDifX = e.originalEvent.touches[0].pageX;
            touchDifY = e.originalEvent.touches[0].pageY;
          }
        });

        me.on('touchmove', function(e){
          // prevent scrolling the page if necessary
          if(!releaseScroll)
          {
  		      e.originalEvent.preventDefault();
		      }
          if (e.originalEvent.touches.length)
          {
            // see how far user swiped
            var diffX = (touchDifX - e.originalEvent.touches[0].pageX) / o.touchScrollStep;
            var diffY = (touchDifY - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
            // scroll content
            scrollContent(diffX, diffY, true);
            touchDifX = e.originalEvent.touches[0].pageX;
            touchDifY = e.originalEvent.touches[0].pageY;
          }
        });


        // attach scroll events
        attachWheel(this);

        function _getDeltaFromEvent(e) {
          var deltaX     = 0;
          var deltaY     = 0;

          // Old school scrollwheel delta
          if ( 'detail'      in e ) { deltaY = e.detail;      }
          if ( 'wheelDelta'  in e ) { deltaY = -1 * e.wheelDelta / 6;       }
          if ( 'wheelDeltaY' in e ) { deltaY = -1 * e.wheelDeltaY / 6;      }
          if ( 'wheelDeltaX' in e ) { deltaX = e.wheelDeltaX / 6; }

          // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
          if ( 'axis' in e && e.axis === e.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
          }

          if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
            // IE in some mouse drivers
            deltaX = 0;
            deltaY = e.wheelDelta;
          }

          // New school wheel delta (wheel event)
          if ( 'deltaY' in e ) {
            deltaY = e.deltaY;
          }
          if ( 'deltaX' in e ) {
            deltaX = e.deltaX;
          }

          return [deltaX, deltaY];
        }

        function _onWheel(e)
        {
          // use mouse wheel only when mouse is over
          if (!isOverPanel) { return; }

          e = e || window.event;

          var delta = _getDeltaFromEvent(e);
          var deltaX = delta[0];
          var deltaY = delta[1];

          // if (e.wheelDelta) { delta = -e.wheelDelta/120; }
          // if (e.detail) { delta = e.detail / 3; }

          var target = e.target || e.srcTarget || e.srcElement;
          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
            // scroll content
            scrollContent(deltaX, deltaY, true);
          }

          // stop window scroll
          if (e.preventDefault && !releaseScroll) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (!releaseScroll) { e.returnValue = false; }
        }

        function scrollContent(x, y, isWheel, isJump)
        {
          releaseScroll = false;

          if(hasHorizontalScrollbar){
            var deltaX = moveFactor = x;
            if(o.applyVerticalWheelToHorizontal && o.axis == 'x' && !deltaX && !!y){
              deltaX = moveFactor = y;
            }
            var maxLeft = me.outerWidth() - barX.outerWidth();

            if (isWheel)
            {
              // move bar with mouse wheel
              deltaX = parseInt(barX.css('left')) + (moveFactor * parseInt(o.wheelStep)/100);

              // move bar, make sure it doesn't go out
              deltaX = Math.min(Math.max(deltaX, 0), maxLeft);

              // if scrolling right, make sure a fractional change to the
              // scroll position isn't rounded away when the scrollbar's CSS is set
              // this flooring of delta would happened automatically when
              // bar.css is set below, but we floor here for clarity
              deltaX = (moveFactor > 0) ? Math.ceil(deltaX) : Math.floor(deltaX);

              // scroll the scrollbar
              barX.css({ left: deltaX + 'px' });
            }

            // calculate actual scroll amount
            percentScrollX = parseInt(barX.css('left')) / (me.outerWidth() - barX.outerWidth());
            deltaX = percentScrollX * (me[0].scrollWidth - me.outerWidth());

            if (isJump)
            {
              deltaX = x;
              var offsetLeft = deltaX / me[0].scrollWidth * me.outerWidth();
              offsetLeft = Math.min(Math.max(offsetLeft, 0), maxLeft);
              barX.css({ left: offsetLeft + 'px' });
            }

            // scroll content and fire scrolling event
            me.scrollLeft(deltaX);
            me.trigger('slimscrollingX', ~~deltaX);

            // ensure bar is visible
            showBarX();

            // trigger hide when scroll is stopped
            hideBarX();
          }


          if(hasVerticalScrollbar){
            var deltaY = y;
            var maxTop = me.outerHeight() - barY.outerHeight();

            if (isWheel)
            {
              // move bar with mouse wheel
              deltaY = parseInt(barY.css('top')) + (y * parseInt(o.wheelStep) /100);

              // move bar, make sure it doesn't go out
              deltaY = Math.min(Math.max(deltaY, 0), maxTop);

              // if scrolling down, make sure a fractional change to the
              // scroll position isn't rounded away when the scrollbar's CSS is set
              // this flooring of delta would happened automatically when
              // bar.css is set below, but we floor here for clarity
              deltaY = (y > 0) ? Math.ceil(deltaY) : Math.floor(deltaY);

              // scroll the scrollbar
              barY.css({ top: deltaY + 'px' });
            }

            // calculate actual scroll amount
            percentScrollY = parseInt(barY.css('top')) / (me.outerHeight() - barY.outerHeight());
            deltaY = percentScrollY * (me[0].scrollHeight - me.outerHeight());

            if (isJump)
            {
              deltaY = y;
              var offsetTop = deltaY / me[0].scrollHeight * me.outerHeight();
              offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
              barY.css({ top: offsetTop + 'px' });
            }

            // scroll content and fire scrolling event
            me.scrollTop(deltaY);
            me.trigger('slimscrollingY', ~~deltaY);

            // ensure bar is visible
            showBarY();

            // trigger hide when scroll is stopped
            hideBarY();
          }

        }

        function attachWheel(target)
        {
          if (window.addEventListener)
          {
            if (typeof window.onwheel !== "undefined") {
              target.addEventListener('wheel', _onWheel, false );
            } else if (typeof window.onmousewheel !== "undefined") {
              target.addEventListener('mousewheel', _onWheel, false );
            }
            target.addEventListener('DOMMouseScroll', _onWheel, false );
          }
          else
          {
            document.attachEvent("onmousewheel", _onWheel);
          }
        }

        function getBarXWidth()
        {
          if(!barX){return;}
          // calculate scrollbar height and make sure it is not too small
          barWidth = Math.max((me.outerWidth() / me[0].scrollWidth) * me.outerWidth(), minBarWidth);
          barX.css({ width: barWidth + 'px' });

          // hide scrollbar if content is not long enough
          // var display = barWidth == me.outerWidth() ? 'none' : 'block';
          var display = (hasHorizontalScrollbar && (me[0].scrollWidth>me[0].clientWidth)) ? 'block' : 'none';
          barX.css({ display: display });
        }

        function getBarYHeight()
        {
          if(!barY){return;}
          // calculate scrollbar height and make sure it is not too small
          barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
          barY.css({ height: barHeight + 'px' });

          // hide scrollbar if content is not long enough
          // var display = barHeight == me.outerHeight() ? 'none' : 'block';
          var display = (hasVerticalScrollbar && (me[0].scrollHeight>me[0].clientHeight)) ? 'block' : 'none';
          barY.css({ display: display });
        }


        function showBarX()
        {
          if(!barX){return;}
          // recalculate bar height
          getBarXWidth();
          clearTimeout(queueHideX);

          // when bar reached top or bottom
          if (percentScrollX == ~~percentScrollX)
          {
            //release wheel
            releaseScroll = o.allowPageScroll;

            // publish approporiate event
            if (lastScrollX != percentScrollX)
            {
              var msg = (~~percentScrollX === 0) ? 'left' : 'right';
              me.trigger('slimscrollX', msg);
            }
          }
          else
          {
            releaseScroll = false;
          }
          lastScrollX = percentScrollX;

          // show only when required
          if(barWidth >= me.outerWidth()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          barX.stop(true,true).fadeIn('fast');
          if (o.railVisible) { railX.stop(true,true).fadeIn('fast'); }
        }

        function hideBarX()
        {
          if(!barX){return;}
          // only hide when options allow it
          if (!o.alwaysVisible)
          {
            queueHideX = setTimeout(function(){
              if (!(o.disableFadeOut && isOverPanel) && !isOverBarX && !isDragg)
              {
                barX.fadeOut('slow');
                railX.fadeOut('slow');
              }
            }, 1000);
          }
        }

        function showBarY()
        {
          if(!barY){return;}
          // recalculate bar height
          getBarYHeight();
          clearTimeout(queueHideY);

          // when bar reached top or bottom
          if (percentScrollY == ~~percentScrollY)
          {
            //release wheel
            releaseScroll = o.allowPageScroll;

            // publish approporiate event
            if (lastScrollY != percentScrollY)
            {
                var msg = (~~percentScrollY === 0) ? 'top' : 'bottom';
                me.trigger('slimscrollY', msg);
            }
          }
          else
          {
            releaseScroll = false;
          }
          lastScrollY = percentScrollY;

          // show only when required
          if(barHeight >= me.outerHeight()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          barY.stop(true,true).fadeIn('fast');
          if (o.railVisible) { railY.stop(true,true).fadeIn('fast'); }
        }

        function hideBarY()
        {
          if(!barY){return;}
          // only hide when options allow it
          if (!o.alwaysVisible)
          {
            queueHideY = setTimeout(function(){
              if (!(o.disableFadeOut && isOverPanel) && !isOverBarY && !isDragg)
              {
                barY.fadeOut('slow');
                railY.fadeOut('slow');
              }
            }, 1000);
          }
        }

      });

      this.trigger('initialized');

      // maintain chainability
      return this;
    }
  });

  $.fn.extend({
    slimscroll: $.fn.slimScroll
  });

})(jQuery);

/*!
 * Lightbox v2.9.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.lightbox = factory(root.jQuery);
    }
}(this, function ($) {

  function Lightbox(options) {
    this.album = [];
    this.currentImageIndex = void 0;
    this.init();

    // options
    this.options = $.extend({}, this.constructor.defaults);
    this.option(options);
  }

  // Descriptions of all options available on the demo site:
  // http://lokeshdhakar.com/projects/lightbox2/index.html#options
  Lightbox.defaults = {
    albumLabel: 'Image %1 of %2',
    alwaysShowNavOnTouchDevices: false,
    fadeDuration: 600,
    fitImagesInViewport: true,
    imageFadeDuration: 600,
    // maxWidth: 800,
    // maxHeight: 600,
    positionFromTop: 50,
    resizeDuration: 700,
    showImageNumberLabel: true,
    wrapAround: false,
    disableScrolling: false,
    /*
    Sanitize Title
    If the caption data is trusted, for example you are hardcoding it in, then leave this to false.
    This will free you to add html tags, such as links, in the caption.

    If the caption data is user submitted or from some other untrusted source, then set this to true
    to prevent xss and other injection attacks.
     */
    sanitizeTitle: false
  };

  Lightbox.prototype.option = function(options) {
    $.extend(this.options, options);
  };

  Lightbox.prototype.imageCountLabel = function(currentImageNum, totalImages) {
    return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
  };

  Lightbox.prototype.init = function() {
    var self = this;
    // Both enable and build methods require the body tag to be in the DOM.
    $(document).ready(function() {
      self.enable();
      self.build();
    });
  };

  // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
  // that contain 'lightbox'. When these are clicked, start lightbox.
  Lightbox.prototype.enable = function() {
    var self = this;
    $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
      self.start($(event.currentTarget));
      return false;
    });
  };

  // Build html for the lightbox and the overlay.
  // Attach event handlers to the new DOM elements. click click click
  Lightbox.prototype.build = function() {
    var self = this;
    $('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo($('body'));

    // Cache jQuery objects
    this.$lightbox       = $('#lightbox');
    this.$overlay        = $('#lightboxOverlay');
    this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
    this.$container      = this.$lightbox.find('.lb-container');
    this.$image          = this.$lightbox.find('.lb-image');
    this.$nav            = this.$lightbox.find('.lb-nav');

    // Store css values for future lookup
    this.containerPadding = {
      top: parseInt(this.$container.css('padding-top'), 10),
      right: parseInt(this.$container.css('padding-right'), 10),
      bottom: parseInt(this.$container.css('padding-bottom'), 10),
      left: parseInt(this.$container.css('padding-left'), 10)
    };

    this.imageBorderWidth = {
      top: parseInt(this.$image.css('border-top-width'), 10),
      right: parseInt(this.$image.css('border-right-width'), 10),
      bottom: parseInt(this.$image.css('border-bottom-width'), 10),
      left: parseInt(this.$image.css('border-left-width'), 10)
    };

    // Attach event handlers to the newly minted DOM elements
    this.$overlay.hide().on('click', function() {
      self.end();
      return false;
    });

    this.$lightbox.hide().on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$outerContainer.on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$lightbox.find('.lb-prev').on('click', function() {
      if (self.currentImageIndex === 0) {
        self.changeImage(self.album.length - 1);
      } else {
        self.changeImage(self.currentImageIndex - 1);
      }
      return false;
    });

    this.$lightbox.find('.lb-next').on('click', function() {
      if (self.currentImageIndex === self.album.length - 1) {
        self.changeImage(0);
      } else {
        self.changeImage(self.currentImageIndex + 1);
      }
      return false;
    });

    /*
      Show context menu for image on right-click

      There is a div containing the navigation that spans the entire image and lives above of it. If
      you right-click, you are right clicking this div and not the image. This prevents users from
      saving the image or using other context menu actions with the image.

      To fix this, when we detect the right mouse button is pressed down, but not yet clicked, we
      set pointer-events to none on the nav div. This is so that the upcoming right-click event on
      the next mouseup will bubble down to the image. Once the right-click/contextmenu event occurs
      we set the pointer events back to auto for the nav div so it can capture hover and left-click
      events as usual.
     */
    this.$nav.on('mousedown', function(event) {
      if (event.which === 3) {
        self.$nav.css('pointer-events', 'none');

        self.$lightbox.one('contextmenu', function() {
          setTimeout(function() {
              this.$nav.css('pointer-events', 'auto');
          }.bind(self), 0);
        });
      }
    });


    this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
      self.end();
      return false;
    });
  };

  // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
  Lightbox.prototype.start = function($link) {
    var self    = this;
    var $window = $(window);

    $window.on('resize', $.proxy(this.sizeOverlay, this));

    $('select, object, embed').css({
      visibility: 'hidden'
    });

    this.sizeOverlay();

    this.album = [];
    var imageNumber = 0;

    function addToAlbum($link) {
      self.album.push({
        link: $link.attr('href'),
        title: $link.attr('data-title') || $link.attr('title')
      });
    }

    // Support both data-lightbox attribute and rel attribute implementations
    var dataLightboxValue = $link.attr('data-lightbox');
    var $links;

    if (dataLightboxValue) {
      $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
      for (var i = 0; i < $links.length; i = ++i) {
        addToAlbum($($links[i]));
        if ($links[i] === $link[0]) {
          imageNumber = i;
        }
      }
    } else {
      if ($link.attr('rel') === 'lightbox') {
        // If image is not part of a set
        addToAlbum($link);
      } else {
        // If image is part of a set
        $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
        for (var j = 0; j < $links.length; j = ++j) {
          addToAlbum($($links[j]));
          if ($links[j] === $link[0]) {
            imageNumber = j;
          }
        }
      }
    }

    // Position Lightbox
    var top  = $window.scrollTop() + this.options.positionFromTop;
    var left = $window.scrollLeft();
    this.$lightbox.css({
      top: top + 'px',
      left: left + 'px'
    }).fadeIn(this.options.fadeDuration);

    // Disable scrolling of the page while open
    if (this.options.disableScrolling) {
      $('body').addClass('lb-disable-scrolling');
    }

    this.changeImage(imageNumber);
  };

  // Hide most UI elements in preparation for the animated resizing of the lightbox.
  Lightbox.prototype.changeImage = function(imageNumber) {
    var self = this;

    this.disableKeyboardNav();
    var $image = this.$lightbox.find('.lb-image');

    this.$overlay.fadeIn(this.options.fadeDuration);

    $('.lb-loader').fadeIn('slow');
    this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

    this.$outerContainer.addClass('animating');

    // When image to show is preloaded, we send the width and height to sizeContainer()
    var preloader = new Image();
    preloader.onload = function() {
      var $preloader;
      var imageHeight;
      var imageWidth;
      var maxImageHeight;
      var maxImageWidth;
      var windowHeight;
      var windowWidth;

      $image.attr('src', self.album[imageNumber].link);

      $preloader = $(preloader);

      $image.width(preloader.width);
      $image.height(preloader.height);

      if (self.options.fitImagesInViewport) {
        // Fit image inside the viewport.
        // Take into account the border around the image and an additional 10px gutter on each side.

        windowWidth    = $(window).width();
        windowHeight   = $(window).height();
        maxImageWidth  = windowWidth - self.containerPadding.left - self.containerPadding.right - self.imageBorderWidth.left - self.imageBorderWidth.right - 20;
        maxImageHeight = windowHeight - self.containerPadding.top - self.containerPadding.bottom - self.imageBorderWidth.top - self.imageBorderWidth.bottom - 120;

        // Check if image size is larger then maxWidth|maxHeight in settings
        if (self.options.maxWidth && self.options.maxWidth < maxImageWidth) {
          maxImageWidth = self.options.maxWidth;
        }
        if (self.options.maxHeight && self.options.maxHeight < maxImageWidth) {
          maxImageHeight = self.options.maxHeight;
        }

        // Is the current image's width or height is greater than the maxImageWidth or maxImageHeight
        // option than we need to size down while maintaining the aspect ratio.
        if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
          if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
            imageWidth  = maxImageWidth;
            imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
            $image.width(imageWidth);
            $image.height(imageHeight);
          } else {
            imageHeight = maxImageHeight;
            imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
            $image.width(imageWidth);
            $image.height(imageHeight);
          }
        }
      }
      self.sizeContainer($image.width(), $image.height());
    };

    preloader.src          = this.album[imageNumber].link;
    this.currentImageIndex = imageNumber;
  };

  // Stretch overlay to fit the viewport
  Lightbox.prototype.sizeOverlay = function() {
    this.$overlay
      .width($(document).width())
      .height($(document).height());
  };

  // Animate the size of the lightbox to fit the image we are showing
  Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
    var self = this;

    var oldWidth  = this.$outerContainer.outerWidth();
    var oldHeight = this.$outerContainer.outerHeight();
    var newWidth  = imageWidth + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
    var newHeight = imageHeight + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

    function postResize() {
      self.$lightbox.find('.lb-dataContainer').width(newWidth);
      self.$lightbox.find('.lb-prevLink').height(newHeight);
      self.$lightbox.find('.lb-nextLink').height(newHeight);
      self.showImage();
    }

    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      this.$outerContainer.animate({
        width: newWidth,
        height: newHeight
      }, this.options.resizeDuration, 'swing', function() {
        postResize();
      });
    } else {
      postResize();
    }
  };

  // Display the image and its details and begin preload neighboring images.
  Lightbox.prototype.showImage = function() {
    this.$lightbox.find('.lb-loader').stop(true).hide();
    this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration);

    this.updateNav();
    this.updateDetails();
    this.preloadNeighboringImages();
    this.enableKeyboardNav();
  };

  // Display previous and next navigation if appropriate.
  Lightbox.prototype.updateNav = function() {
    // Check to see if the browser supports touch events. If so, we take the conservative approach
    // and assume that mouse hover events are not supported and always show prev/next navigation
    // arrows in image sets.
    var alwaysShowNav = false;
    try {
      document.createEvent('TouchEvent');
      alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
    } catch (e) {}

    this.$lightbox.find('.lb-nav').show();

    if (this.album.length > 1) {
      if (this.options.wrapAround) {
        if (alwaysShowNav) {
          this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
        }
        this.$lightbox.find('.lb-prev, .lb-next').show();
      } else {
        if (this.currentImageIndex > 0) {
          this.$lightbox.find('.lb-prev').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-prev').css('opacity', '1');
          }
        }
        if (this.currentImageIndex < this.album.length - 1) {
          this.$lightbox.find('.lb-next').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-next').css('opacity', '1');
          }
        }
      }
    }
  };

  // Display caption, image number, and closing button.
  Lightbox.prototype.updateDetails = function() {
    var self = this;

    // Enable anchor clicks in the injected caption html.
    // Thanks Nate Wright for the fix. @https://github.com/NateWr
    if (typeof this.album[this.currentImageIndex].title !== 'undefined' &&
      this.album[this.currentImageIndex].title !== '') {
      var $caption = this.$lightbox.find('.lb-caption');
      if (this.options.sanitizeTitle) {
        $caption.text(this.album[this.currentImageIndex].title);
      } else {
        $caption.html(this.album[this.currentImageIndex].title);
      }
      $caption.fadeIn('fast')
        .find('a').on('click', function(event) {
          if ($(this).attr('target') !== undefined) {
            window.open($(this).attr('href'), $(this).attr('target'));
          } else {
            location.href = $(this).attr('href');
          }
        });
    }

    if (this.album.length > 1 && this.options.showImageNumberLabel) {
      var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
      this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
    } else {
      this.$lightbox.find('.lb-number').hide();
    }

    this.$outerContainer.removeClass('animating');

    this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
      return self.sizeOverlay();
    });
  };

  // Preload previous and next images in set.
  Lightbox.prototype.preloadNeighboringImages = function() {
    if (this.album.length > this.currentImageIndex + 1) {
      var preloadNext = new Image();
      preloadNext.src = this.album[this.currentImageIndex + 1].link;
    }
    if (this.currentImageIndex > 0) {
      var preloadPrev = new Image();
      preloadPrev.src = this.album[this.currentImageIndex - 1].link;
    }
  };

  Lightbox.prototype.enableKeyboardNav = function() {
    $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
  };

  Lightbox.prototype.disableKeyboardNav = function() {
    $(document).off('.keyboard');
  };

  Lightbox.prototype.keyboardAction = function(event) {
    var KEYCODE_ESC        = 27;
    var KEYCODE_LEFTARROW  = 37;
    var KEYCODE_RIGHTARROW = 39;

    var keycode = event.keyCode;
    var key     = String.fromCharCode(keycode).toLowerCase();
    if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
      this.end();
    } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
      if (this.currentImageIndex !== 0) {
        this.changeImage(this.currentImageIndex - 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(this.album.length - 1);
      }
    } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
      if (this.currentImageIndex !== this.album.length - 1) {
        this.changeImage(this.currentImageIndex + 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(0);
      }
    }
  };

  // Closing time. :-(
  Lightbox.prototype.end = function() {
    this.disableKeyboardNav();
    $(window).off('resize', this.sizeOverlay);
    this.$lightbox.fadeOut(this.options.fadeDuration);
    this.$overlay.fadeOut(this.options.fadeDuration);
    $('select, object, embed').css({
      visibility: 'visible'
    });
    if (this.options.disableScrolling) {
      $('body').removeClass('lb-disable-scrolling');
    }
  };

  return new Lightbox();
}));

/*!
 * Masonry PACKAGED v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});
