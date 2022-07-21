$(document).ready(function () {


    $(".modal .modal__container").on("click", function (e) {
        e.stopPropagation();
    });

    $(".open__modal").on("click", function (e) {
        e.preventDefault();
        const open = $(this).data('open');
        $(open).fadeIn();
    });

    $(".modal .close, .modal, .modal-close ").on("click", function (e) {
        e.preventDefault();
        $(".modal").fadeOut(function () {
            $("body").css("overflow", "auto");
        });
    });


    $('.lightbox').topbox();

    $('.delete').on('click', function () {
        const element = $(this).data('delete')
        $(this).parents(element).remove();
    })

    $('.delete-parent').on('click', function () {
        $(this).parent().remove();
    })

    $('.delete-all').on('click', function () {
        const element = $(this).data('delete'),
            parent = $(this).data('parent')
        $(parent).children(element).remove();
    })

    $('.check-all').on('change', function () {
        const $this = $(this),
            val = $this.is(':checked'),
            element = $this.data('check'),
            parent = $this.data('parent');
        $(`${parent} ${element}`).prop('checked', val);
    })

    $('.sort-btn').on('click', function () {
        $('.sort-btn').removeClass('active')
        $(this).addClass('active')
    })

    $('.added-comparison .close').on('click', () => addedComparisonShow())
    $('.added-comparison__btn').on('click', () => addedComparisonShow(true))

    function addedComparisonShow(show = false) {
        if (show) {
            $('body').addClass('added-comparison__active')
        } else {
            $('body').removeClass('added-comparison__active')
        }
    }

    $('.basket-products .form-checkbox').on('change', function () {
        const $this = $(this),
            val = $this.is(':checked');
        $('.check-all').prop('checked', val);
    })

    $(document).on('click', '.kilograms .minus , .kilograms .plus  ', function () {
        var $this = $(this),
            min = +$this.parents('.kilograms').data('min') || 1,
            step = +$this.parents('.kilograms').data('step'),
            kilogram = $this.siblings('.kilogram').find('input'),
            kilogramVal = +kilogram.val();

        if ($this.hasClass('minus') && kilogramVal > min) {
            kilogramVal -= step;
            if (kilogramVal < step) {
                kilogram = step
            }
        } else if ($this.hasClass('plus')) {
            kilogramVal += step;
        }

        if (kilogramVal > min) {
            $this.parents('.kilograms').find('.minus').removeClass('disabled')
        } else {
            $this.parents('.kilograms').find('.minus').addClass('disabled')
        }
        kilogram.val(kilogramVal)
    })


    $(".accordion-toggle").on('click', function () {
        const $this = $(this),
            parent = $this.data('parent'),
            show = $this.data('show')
        $this.parent(parent).toggleClass('active')
        $this.parent(parent).children(show).slideToggle(300)
    });


    const cookie = localStorage.getItem('cookie')
    if (cookie !== 'true') {
        $('.cookies').show()
    }

    $('.btn-cookies').on('click', function () {
        if (!cookie && cookie !== 'true') {
            localStorage.setItem('cookie', 'true')
            $('.cookies').hide()
        }
    })

    $('.header-location').on('click', function () {
        $(this).toggleClass('active')
    })
    $('.header-menu').on('click', function () {
        $(this).toggleClass('active')
    })

    $('.header-search').on('click', function () {
        $('.header-search__block-elements').slideToggle(300)
    })
    $('.header-search__block-close').on('click', function () {
        $('.header-search__block-elements').slideUp(300)
    })

    $('.header-catalog,.category-min__svg').on('click', function () {
        $('.header-catalog__block').toggleClass('active')
    })
    $('.header-catalog__close').on('click', function () {
        $('.header-catalog__block').removeClass('active')
    })

    $('.like').on('click', function () {
        $(this).toggleClass('active')
    })


    $('.tooltip-btn').on('mouseenter focus', function () {
        $(this).parent().children('.tooltip').attr('data-show', '')
        const button = $(this)[0],
            tooltip = $(this).parent().children('.tooltip')[0],
            arrow = $(this).parent().children('.arrow')[0];

        const popperInstance = Popper.createPopper(button, tooltip, {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                        element: arrow,

                    },
                },
            ],
        });

        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                {name: 'eventListeners', enabled: true},
            ],
        }));

        popperInstance.update();
    }).on('mouseleave blur', function () {
        $(this).parent().children('.tooltip').removeAttr('data-show')
        const button = $(this)[0],
            tooltip = $(this).parent().children('.tooltip')[0],
            arrow = $(this).parent().children('.arrow')[0];
        const popperInstance = Popper.createPopper(button, tooltip, {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                        element: arrow,
                    },
                },
            ],
        });
        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                {name: 'eventListeners', enabled: false},
            ],
        }));
        popperInstance.update();

    });
    $('.tab').on('click', function () {
        const item = $(this).data('item')
        $(this).parent().children('.tab').removeClass('active')
        $(this).addClass('active')
        $(`.tab-content`).slideUp(0)
        $(`.tab-content${item}`).slideDown(0)
    })


//Map
    if ($('div').is('#map')) {
        ymaps.ready(init_big_map);

        function init_big_map() {
            myMap = new ymaps.Map("map", {
                center: [55.725595, 37.449677],
                zoom: 10,
                controls: []
            });
            var balloonContent = `
        <div class="map-inner" style="width: 260px;">
            <div class="left">
                <img src="img/map-logo.png" alt="map-logo">
            </div>
            <div class="right">
                <div class="title">АКБ Трейд</div>
                <div class="map">Брянск,, Гончарный проезд 8/40</div>
            </div>
        </div>`;
            var myPlacemark = new ymaps.Placemark([55.886342, 37.676026], {
                    hintContent: '«Склад Дверей 169»',
                    balloonContent: balloonContent
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/place_icon.png',
                    iconImageSize: [8, 8],
                    iconImageOffset: [0, 0]
                });


            var myPlacemark1 = new ymaps.Placemark([55.725595, 37.449677], {
                    hintContent: '«Склад Дверей 169»',
                    balloonContent: balloonContent
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: '/img/place_icon.png',
                    iconImageSize: [8, 8],
                    iconImageOffset: [0, 0]
                });


            var myPlacemark2 = new ymaps.Placemark([55.745625, 37.857494], {
                    hintContent: '«Склад Дверей 169»',
                    balloonContent: balloonContent
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/place_icon.png',
                    iconImageSize: [8, 8],
                    iconImageOffset: [0, 0]
                });

            var myPlacemark3 = new ymaps.Placemark([55.734293, 37.398042], {
                    hintContent: '«Склад Дверей 169»',
                    balloonContent: balloonContent
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/place_icon.png',
                    iconImageSize: [8, 8],
                    iconImageOffset: [0, 0]
                });


            myMap.geoObjects.add(myPlacemark);
            myMap.geoObjects.add(myPlacemark1);
            myMap.geoObjects.add(myPlacemark2);
            myMap.geoObjects.add(myPlacemark3);

            myMap.behaviors.disable('scrollZoom')
            myMap.events.add('click', function () {
                myMap.behaviors.enable('scrollZoom');
            })
        }
    }

    $(".select-plugin").select2()
        .on('select2:open', function (e) {
            $('.select2-search__field').attr('placeholder', 'Введите название марки');
        })
    $(".price-slider").slider({
        range: true,
        values: [1, 1210],
        min: 1,
        max: 1210,
        slide: function (event, ui) {
            const $this = $(this),
                parent = $this.data('parent'),
                max = $this.data('max'),
                min = $this.data('min')

            if (ui.handleIndex === 1) {
                $this.parents(parent).find(max).val('до ' + ui.value)
            } else {
                $this.parents(parent).find(min).val('от ' + ui.value)
            }
        }
    });
    $(".input-min").on('keyup', function () {
        let $this = $(this),
            parent = $this.data('parent'),
            price = $this.data('price'),
            element = $this.parents(parent).find(price),
            minText = $this.val(),
            maxText = $this.parents(parent).find('.input-max').val(),
            splitText = minText.split(' '),
            min = splitText[1],
            max = parseInt(maxText.split(' ')[1])
        if (splitText[0] !== 'от') {
            $(this).val('от 25')
        }
        if (min >= max) {
            min = max;
            $this.val('от ' + max)
        }
        element.slider("values", 0, parseInt(min));
    });
    $(".input-max").on('keyup', function () {
        let $this = $(this),
            parent = $this.data('parent'),
            price = $this.data('price'),
            element = $this.parents(parent).find(price),
            maxText = $this.val(),
            minText = $this.parents(parent).find('.input-min').val(),
            splitText = maxText.split(' '),
            max = splitText[1],
            min = parseInt(minText.split(' ')[1])
        if (splitText[0] !== 'до') {
            $(this).val('до 1210')
        }
        if (max <= min) {
            max = min;
            $this.val(min)
        }
        element.slider("values", 1, max);
    });
    $('.footer-more-inner').slick({
        infinite: false,
        nextArrow: $('.footer-more__arrow-right'),
        prevArrow: $('.footer-more__arrow-left'),
    })

    $('.certificates-list').slick({
        slidesToShow: 3,
        variableWidth: true,
        pauseOnHover: true,
        arrows: false
    });
    addCursorHover(".certificates-list", ".certificates-cursor", "active");

    $('.certificates-list').on('mousemove mouseover', function (e) {
        console.log(e)
        $('.certificates-cursor').css({
            "transform": `translate(${e.clientX}px, ${e.clientY}px)`
        })
    })



    function addCursorHover(hoveredElement, selectedElement, newClass) {
        $(hoveredElement).hover(function () {
            $(selectedElement).addClass(newClass);
        }, function () {
            $(selectedElement).removeClass(newClass);
        });
    }
})

