// test passing hint to the count cmd 
// hints are ignored if there is no query predicate
t = db.jstests_count_hint;
t.drop();

t.save( { i: 1 } );
t.save( { i: 2 } );
assert.eq( 2, t.find().count() );

t.ensureIndex( { i:1 } );

assert.eq( 1, t.find( { i: 1 } ).hint( "_id_" ).count(), "A" );
assert.eq( 2, t.find().hint( "_id_" ).count(), "B" );
assert.throws( function() { t.find( { i: 1 } ).hint( "BAD HINT" ).count(); } );

// create a sparse index which should have no entries
t.ensureIndex( { x:1 }, { sparse:true } );

assert.eq( 0, t.find( { i: 1 } ).hint( "x_1" ).count(), "C" );
assert.eq( 2, t.find().hint( "x_1" ).count(), "D" );
