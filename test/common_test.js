'use strict';

describe('Common functions: ', function() {

  var globs, patterns;

  describe('Common glob functions', function() {

    beforeEach(function() {
      globs = 'nitin* *nitin ni*in n?t?n';
      patterns = ['^nitin.*$', '^.*nitin$', '^ni.*in$', '^n.t.n$'];
    });

    it(globs + ' should return valid patterns', function() {
      globs = globs.split(' ');
      for(var i = 0; i < globs.length; i++) {
        expect(globToPattern(globs[i])).toBe(patterns[i]);
      }
    });

    it(globs + ' should return valid patterns', function() {
      expect(globsToPatterns(globs)).toEqual(patterns);
    });

  });

  describe('Common match functions', function() {

    beforeEach(function() {
      globs = 'nitin* *nitin ni*in n?t?n';
      patterns = ['^nitin.*$', '^.*nitin$', '^ni.*in$', '^n.t.n$'];
    });

    it('matchAny nitin with patterns|globs', function() {
      expect(matchGlobs(globs, 'nitin')).toBe(true);
      expect(matchAny(patterns, 'nitin')).toBe(true);
    });

    it('match nitin.tutlani with any patterns', function() {
      expect(matchGlobs(globs, 'nitin.tutlani')).toBe(true);
      expect(matchAny(patterns, 'nitin.tutlani')).toBe(true);
    });

    it('match tutlani.nitin with any patterns', function() {
      expect(matchGlobs(globs, 'tutlani.nitin')).toBe(true);
      expect(matchAny(patterns, 'tutlani.nitin')).toBe(true);
    });

    it('match NITIN with any patterns', function() {
      expect(matchGlobs(globs, 'NITIN')).toBe(false);
      expect(matchAny(patterns, 'NITIN')).toBe(false);
    });

  });

});