var Dialog    = require('./../../components/dialog/dialog'),
	Loading   = require('./../../components/loading/loading');

var databus = require("databus");

var HOMEHEIGHT       = $('.note-home').height();
var NOTEHEIGHT       = $('.one-note').height();
var SHOWONENOTECLS   = "note_container_showonenote";
var SHOWBOOKCLS      = 'note_container_shownotebooks';
var NOTEBLOCKHIDECLS = 'note_block_hide'; 
var DELAY          = 300;

function whichTransitionEvent() {
    var t,
    	el = document.createElement('fakeelement');
    	transitions = {
	        'OTransition'       :'oTransitionEnd',
	        'MSTransition'      :'msTransitionEnd',
	        'MozTransition'     :'transitionend',
	        'WebkitTransition'  :'webkitTransitionEnd',
	        'transition' 		:'transitionEnd'
	    };

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }

    return false;
}

function Notes() {
	this.init();
}

Notes.prototype = {
	init: function() {
		this.initDOM();
		this.initPage();
		this.bindEvent();
	},

	initDOM: function() {
		this.$noteContainer = $('.note_container');
		this.$noteTitle     = $('#_j_note_title');
		this.$bookName      = $('#_j_notebook_name');
		this.$noteContent   = $('#_j_note_content');
		this.$noteBackBtn   = $('#_j_note_back_btn');		
		this.$notePanel     = $('.note_panel');
		this.$bookHeader    = $('.book_panel .note_block-header-arrow');
	},

	initPage: function() {
		this.initSize();
		this.initPageBlock();
		this.getCacheData();
	},

	initSize: function() {
		var that = this;

		this.$noteContainer.height(HOMEHEIGHT);

		setTimeout(function() {
			that.$notePanel.height(that.$notePanel.height() - 10);
		}, 1000);
	},

	initPageBlock: function() {
		var from = $('#_j_page_from').data().from;

		if ( from === 'home' ) {
			this.$noteContainer.addClass(SHOWONENOTECLS);
			$('.one-note .note_block').removeClass(NOTEBLOCKHIDECLS);
		}

		else
			$('.note-index .note_block').removeClass(NOTEBLOCKHIDECLS);
	},

	bindEvent: function() {
		var that = this;

		$('.note_block-note').on('tap', function() {
			that.showOneNote.call(that, this);
		});

		this.$noteBackBtn.on('tap', function() {
			that.clickBackBtn.call(that, this);
		});

		this.$bookHeader.on('tap', function() {
			that.showAllNotebooks.call(that, this);
		});
	},

	renderOneNote: function(note) {
		var that = this;

		that.$noteTitle.text(note.title);
		that.$bookName.text(note.notebook_name);
		that.$noteContent.text(note.content);

		that.$noteContainer.addClass(SHOWONENOTECLS);
		$('.one-note .note_block').removeClass(NOTEBLOCKHIDECLS);
		setTimeout(function() {
			that.$noteContainer.height(NOTEHEIGHT);
		}, DELAY);
	},

	showOneNote: function(note) {
		var that = this;

		var id = $(note).data('id');

		if ( this.cacheNote && (id in this.cacheNote) )
			this.renderOneNote(this.cacheNote[id]);

		else
			// TODO
			databus.fetchOneNote(id, function(data) {
				that.renderOneNote(data);
			});
	},

	getCacheData: function(data) {
		if ( !$('#_j_cache_notes').length )
			return

		this.cacheNote = $('#_j_cache_notes').data().cache;
		this.cacheNotebooks = $('#_j_cache_notebooks').data().cache;
	},

	clickBackBtn: function(btn) {
		var $btn = $(btn),
			from = $('#_j_page_from').data().from;

		if ( from === 'home' )
			return window.location.href = '/';

		$('.one-note .note_block').addClass(NOTEBLOCKHIDECLS);
		this.$noteContainer.removeClass(SHOWONENOTECLS);
	},

	showAllNotebooks: function(header) {
		var that = this;

		that.$notePanel.addClass('note_panel_hide');
		that.$noteContainer.addClass(SHOWBOOKCLS);
	}
}

$(function() { 
	var notes = new Notes();
});
