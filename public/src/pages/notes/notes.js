var Dialog    = require('./../../components/dialog/dialog'),
	Loading   = require('./../../components/loading/loading');

var databus = require("databus");

var HOMEHEIGHT     = $('.note-home').height();
var NOTEHEIGHT     = $('.one-note').height();
var SHOWONENOTECLS = "note_container_showonenote";
var DELAY          = 300;

// http://stackoverflow.com/questions/13823188/android-4-1-change-transition-and-webkittransition-defiend-how-to-properly-de
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
	},

	initPage: function() {
		this.initSize();
	},

	initSize: function() {
		this.$noteContainer.height(HOMEHEIGHT);
	},

	bindEvent: function() {
		var that = this;

		$('.note_block-note').on('click', function() {
			that.showOneNote.call(that, this);
		});
	},

	showOneNote: function(note) {
		var that = this;

		var id = $(note).data('id');
		databus.fetchOneNote(id, function(data) {
			that.$noteTitle.text(data.note.title);
			that.$bookName.text(data.notebook.title);
			that.$noteContent.text(data.note.content);

			that.$noteContainer.addClass(SHOWONENOTECLS);
			setTimeout(function() {
				that.$noteContainer.height(NOTEHEIGHT);
			}, DELAY);
		});
	}
}

$(function() {
	var notes = new Notes();
});
