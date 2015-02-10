// Create a Quote Object
var Quote = function(quote, author, rating) {
  this.quote = quote;
  this.author = author;
  this.rating = rating || 0;
}

Quote.prototype.render = function() {
  this.$el = $('<div>')
    .addClass('quotearea')
    .append( 
      '<div class="quote">' + this.quote + '</div>'+ 
      '<div class="author">' + this.author + '</div>' + 
      '<div class="rating">' + this.rating + '</div>' +
      '<div class="action"><button>Delete</button></div>');
  return this.$el;
}

var sortArray = function(quoteArray) {  
  quoteArray.sort(function(a,b) { 
    return parseInt(b.rating) - parseInt(a.rating)
  });
  //console.log(quoteArray.length);
  return quoteArray;
}

// acuqireUserInput
// acquire data from a form
var acquireUserInput = function(e) {
    e.preventDefault();
    quoteArray.push(new Quote(
      $('#textid').val(), 
      $('#authorid').val(), 
      $('#ratingid').val()));  
    console.log($('#textid').val(), $('#authorid').val(), $('#ratingid').val())
    quoteArray = sortArray(quoteArray);
    $('.quotearea').remove();
    for (var i=0; i<quoteArray.length; i++) {
      $('.displayarea')
        .append(quoteArray[i].render());
      }  
    hideQuoteForm();
}

var hideQuoteForm = function() {
  $('.inputquoteform').hide();
}

var showQuoteForm = function() {
  $('.inputquoteform').show();
}

var hideUndoButton = function() {
  $('.undoquote').hide();
}

var showUndoButton = function() {
  $('.undoquote').show();
}

var builtInQuote = function(quoteArray) {
  var quote1 = new Quote("You have to learn the rules of the game. And then you have to play better than anyone else.", "Albert Einstein", 0);
  var quote2 = new Quote("Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.", "Albert Einstein", 1);
  var quote4 = new Quote("When you are courting a nice girl an hour seems like a second. When you sit on a red-hot cinder a second seems like an hour. That's relativity.", "Albert Einstein", 3);
  var quote5 = new Quote("Try not to become a man of success, but rather try to become a man of value.", "Albert Einstein", 4);
  var quote3 = new Quote("Look deep into nature, and then you will understand everything better.", "Albert Einstein", 2);
  quoteArray.push(quote1);
  quoteArray.push(quote2);
  quoteArray.push(quote3);
  quoteArray.push(quote4);
  quoteArray.push(quote5);
}

$(document).on('ready', function() {
  var quoteArray = [];
  //var undoArray = [];
  var undoQuote = new Quote();
  
  hideQuoteForm();
  hideUndoButton();
  builtInQuote(quoteArray);  
  quoteArray = sortArray(quoteArray);
  // display quotes on screen 
  for (var i=0; i<quoteArray.length; i++) {
    //console.log(quoteArray[i]);
    $('.displayarea')
        .append(quoteArray[i].render());
  }  
  
$('#addnewquote').on('click', showQuoteForm)
 
$('#viewrandomquote').on('click', function() {
    
    console.log(quoteArray.length);
    console.log("Random: ", Math.floor(Math.random()*quoteArray.length));
    var randomQuote = quoteArray[Math.floor(Math.random()*quoteArray.length)];
    console.log(randomQuote);
    
    $('.randomquote').remove();
    
    $('.randomquotecontainer').
      append(
        "<div class='randomquote'>" 
        + randomQuote.quote + " " 
        + randomQuote.author + " "
        + randomQuote.rating 
        + "</div>");     

 });

  //$('.inputquoteform').on('submit', acquireUserInput); 
  $('.inputquoteform').on('submit', function(e) {
      e.preventDefault();
      quoteArray.push(new Quote(
      $('#textid').val(), 
      $('#authorid').val(), 
      $('#ratingid').val()));  
      //console.log($('#textid').val(), $('#authorid').val(), $('#ratingid').val())
      quoteArray = sortArray(quoteArray);
      $('.quotearea').remove();
      for (var i=0; i<quoteArray.length; i++) {

      $('.displayarea')
        .append(quoteArray[i].render());
      }  
  });

  $()

  $('.author').on('click', function() {
      console.log(this);

  });

  $('.rating').on('click', function() {
      console.log(this);
  });

  $('.action').on('click', function() {
      console.log("action:", this);
      var tempArray = $(this).siblings();
  
      // // save the quote to undo array
    
      undoQuote.quote = $(tempArray[0]).text();
      undoQuote.author = $(tempArray[1]).text();
      undoQuote.rating = $(tempArray[2]).text();

      //     console.log(undoQuote);
      
      // console.log($(this).parent());
      // // delete the element from screen
      $(this).parent().remove();

      // // delete the element from quoteArray
      for (var i=0; i<quoteArray.length; i++) {
        if (quoteArray[i].quote === undoQuote.quote) {
          quoteArray.splice(i,1);
          break;
        }
      }
      $('.quotearea').remove();
      for (var i=0; i<quoteArray.length; i++) {
        $('.displayarea')
          .append(quoteArray[i].render());
      } 

      // show undo button
      showUndoButton();

  });

  $('.undoquote').on('click', function() {
      quoteArray.push(undoQuote);
      quoteArray = sortArray(quoteArray);
      $('.quotearea').remove();
      for (var i=0; i<quoteArray.length; i++) {
        $('.displayarea')
          .append(quoteArray[i].render());
      }  
      undoQuote = {};
      hideUndoButton();
  });
  
});