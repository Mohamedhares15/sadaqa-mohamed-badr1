// Enhanced Islamic Tasbih App with all requested features

class IslamicTasbihApp {

    constructor() {

        this.currentPage = 'istighfar';

        this.backgroundIndex = 0;

        this.backgroundInterval = null;

        this.audioPlaying = false;

        this.groupKhatmaTarget = 30; // 30 parts for complete Quran

        

        // Surah texts

        this.surahTexts = {

            ikhlas: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

قُلْ هُوَ اللَّهُ أَحَدٌ

اللَّهُ الصَّمَدُ

لَمْ يَلِدْ وَلَمْ يُولَدْ

وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ`,

            

            falaq: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ

مِن شَرِّ مَا خَلَقَ

وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ

وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ

وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ`,

            

            nas: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

قُلْ أَعُوذُ بِرَبِّ النَّاسِ

مَلِكِ النَّاسِ

إِلَٰهِ النَّاسِ

مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ

الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ

مِنَ الْجِنَّةِ وَالنَّاسِ`,

            

            kafirun: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

قُلْ يَا أَيُّهَا الْكَافِرُونَ

لَا أَعْبُدُ مَا تَعْبُدُونَ

وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ

وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ

وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ

لَكُمْ دِينُكُمْ وَلِيَ دِينِ`,

            

            nasr: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ

وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا

فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا`,

            

           yaseen: 'يسٓ (1) وَٱلۡقُرۡءَانِ ٱلۡحَكِيمِ (2) إِنَّكَ لَمِنَ ٱلۡمُرۡسَلِينَ (3) عَلَىٰ صِرَٰطٖ مُّسۡتَقِيمٖ (4) تَنزِيلَ ٱلۡعَزِيزِ ٱلرَّحِيمِ (5) لِتُنذِرَ قَوۡمٗا مَّآ أُنذِرَ ءَابَآؤُهُمۡ فَهُمۡ غَٰفِلُونَ (6) لَقَدۡ حَقَّ ٱلۡقَوۡلُ عَلَىٰٓ أَكۡثَرِهِمۡ فَهُمۡ لَا يُؤۡمِنُونَ (7) إِنَّا جَعَلۡنَا فِيٓ أَعۡنَٰقِهِمۡ أَغۡلَٰلٗا فَهِيَ إِلَى ٱلۡأَذۡقَانِ فَهُم مُّقۡمَحُونَ (8) وَجَعَلۡنَا مِنۢ بَيۡنِ أَيۡدِيهِمۡ سَدّٗا وَمِنۡ خَلۡفِهِمۡ سَدّٗا فَأَغۡشَيۡنَٰهُمۡ فَهُمۡ لَا يُبۡصِرُونَ (9) وَسَوَآءٌ عَلَيۡهِمۡ ءَأَنذَرۡتَهُمۡ أَمۡ لَمۡ تُنذِرۡهُمۡ لَا يُؤۡمِنُونَ (10) إِنَّمَا تُنذِرُ مَنِ ٱتَّبَعَ ٱلذِّكۡرَ وَخَشِيَ ٱلرَّحۡمَٰنَ بِٱلۡغَيۡبِۖ فَبَشِّرۡهُ بِمَغۡفِرَةٖ وَأَجۡرٖ كَرِيمٍ (11) إِنَّا نَحۡنُ نُحۡيِ ٱلۡمَوۡتَىٰ وَنَكۡتُبُ مَا قَدَّمُواْ وَءَاثَٰرَهُمۡۚ وَكُلَّ شَيۡءٍ أَحۡصَيۡنَٰهُ فِيٓ إِمَامٖ مُّبِينٖ (12) وَٱضۡرِبۡ لَهُم مَّثَلًا أَصۡحَٰبَ ٱلۡقَرۡيَةِ إِذۡ جَآءَهَا ٱلۡمُرۡسَلُونَ (13) إِذۡ أَرۡسَلۡنَآ إِلَيۡهِمُ ٱثۡنَيۡنِ فَكَذَّبُوهُمَا فَعَزَّزۡنَا بِثَالِثٖ فَقَالُوٓاْ إِنَّآ إِلَيۡكُم مُّرۡسَلُونَ (14) قَالُواْ مَآ أَنتُمۡ إِلَّا بَشَرٞ مِّثۡلُنَا وَمَآ أَنزَلَ ٱلرَّحۡمَٰنُ مِن شَيۡءٍ إِنۡ أَنتُمۡ إِلَّا تَكۡذِبُونَ (15) قَالُواْ رَبُّنَا يَعۡلَمُ إِنَّآ إِلَيۡكُمۡ لَمُرۡسَلُونَ (16) وَمَا عَلَيۡنَآ إِلَّا ٱلۡبَلَٰغُ ٱلۡمُبِينُ (17) قَالُوٓاْ إِنَّا تَطَيَّرۡنَا بِكُمۡۖ لَئِن لَّمۡ تَنتَهُواْ لَنَرۡجُمَنَّكُمۡ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٞ (18) قَالُواْ طَٰٓئِرُكُم مَّعَكُمۡ أَئِن ذُكِّرۡتُمۚ بَلۡ أَنتُمۡ قَوۡمٞ مُّسۡرِفُونَ (19) وَجَآءَ مِنۡ أَقۡصَا ٱلۡمَدِينَةِ رَجُلٞ يَسۡعَىٰ قَالَ يَٰقَوۡمِ ٱتَّبِعُواْ ٱلۡمُرۡسَلِينَ (20) ٱتَّبِعُواْ مَن لَّا يَسۡـَٔلُكُمۡ أَجۡرٗا وَهُم مُّهۡتَدُونَ (21) وَمَا لِيَ لَآ أَعۡبُدُ ٱلَّذِي فَطَرَنِي وَإِلَيۡهِ تُرۡجَعُونَ (22) ءَأَتَّخِذُ مِن دُونِهِۦٓ ءَالِهَةً إِن يُرِدۡنِ ٱلرَّحۡمَٰنُ بِضُرّٖ لَّا تُغۡنِ عَنِّي شَفَٰعَتُهُمۡ شَيۡـٔٗا وَلَا يُنقِذُونِ (23) إِنِّيٓ إِذٗا لَّفِي ضَلَٰلٖ مُّبِينٍ (24) إِنِّيٓ ءَامَنتُ بِرَبِّكُمۡ فَٱسۡمَعُونِ (25) قِيلَ ٱدۡخُلِ ٱلۡجَنَّةَۖ قَالَ يَٰلَيۡتَ قَوۡمِي يَعۡلَمُونَ (26) بِمَا غَفَرَ لِي رَبِّي وَجَعَلَنِي مِنَ ٱلۡمُكۡرَمِينَ (27) ۞وَمَآ أَنزَلۡنَا عَلَىٰ قَوۡمِهِۦ مِنۢ بَعۡدِهِۦ مِن جُندٖ مِّنَ ٱلسَّمَآءِ وَمَا كُنَّا مُنزِلِينَ (28) إِن كَانَتۡ إِلَّا صَيۡحَةٗ وَٰحِدَةٗ فَإِذَا هُمۡ خَٰمِدُونَ (29) يَٰحَسۡرَةً عَلَى ٱلۡعِبَادِۚ مَا يَأۡتِيهِم مِّن رَّسُولٍ إِلَّا كَانُواْ بِهِۦ يَسۡتَهۡزِءُونَ (30) أَلَمۡ يَرَوۡاْ كَمۡ أَهۡlَكۡنَا قَبۡلَهُم مِّنَ ٱلۡقُرُونِ أَنَّهُمۡ إِلَيۡهِمۡ لَا يَرۡجِعُونَ (31) وَإِن كُلّٞ لَّمَّا جَمِيعٞ لَّدَيۡنَا مُحۡضَرُونَ (32) وَءَايَةٞ لَّهُمُ ٱلۡأَرۡضُ ٱلۡمَيۡتَةُ أَحۡيَيۡنَٰهَا وَأَخۡرَجۡنَا مِنۡهَا حَبّٗا فَمِنۡهُ يَأۡكُلُونَ (33) وَجَعَلۡنَا فِيهَا جَنَّٰتٖ مِّن نَّخِيلٖ وَأَعۡنَٰبٖ وَفَجَّرۡنَا فِيهَا مِنَ ٱلۡعُيُونِ (34) لِيَأۡكُلُواْ مِن ثَمَرِهِۦ وَمَا عَمِلَتۡهُ أَيۡدِيهِمۡۚ أَفَلَا يَشۡكُرُونَ (35) سُبۡحَٰنَ ٱلَّذِي خَلَقَ ٱلۡأَزۡوَٰجَ كُلَّهَا مِمَّا تُنۢبِتُ ٱلۡأَرۡضُ وَمِنۡ أَنفُسِهِمۡ وَمِمَّا لَا يَعۡلَمُونَ (36) وَءَايَةٞ لَّهُمُ ٱلَّيۡلُ نَسۡلَخُ مِنۡهُ ٱلنَّهَارَ فَإِذَا هُم مُّظۡلِمُونَ (37) وَٱلشَّمۡسُ تَجۡرِي لِمُسۡتَقَرّٖ لَّهَاۚ ذَٰلِكَ تَقۡدِيرُ ٱلۡعَزِيزِ ٱلۡعَلِيمِ (38) وَٱلۡقَمَرَ قَدَّرۡنَٰهُ مَنَازِلَ حَتَّىٰ عَادَ كَٱلۡعُرۡجُونِ ٱلۡقَدِيمِ (39) لَا ٱلشَّمۡسُ يَنۢبَغِي لَهَآ أَن تُدۡرِكَ ٱلۡقَمَرَ وَلَا ٱلَّيۡلُ سَابِقُ ٱلنَّهَارِۚ وَكُلّٞ فِي فَلَكٖ يَسۡبَحُونَ (40) وَءَايَةٞ لَّهُمۡ أَنَّا حَمَلۡنَا ذُرِّيَّتَهُمۡ فِي ٱلۡفُلۡكِ ٱلۡمَشۡحُونِ (41) وَخَلَقۡنَا لَهُم مِّن مِّثۡلِهِۦ مَا يَرۡكَبُونَ (42) وَإِن نَّشَأۡ نُغۡرِقۡهُمۡ فَلَا صَرِيخَ لَهُمۡ وَلَا هُمۡ يُنقَذُونَ (43) إِلَّا رَحۡمَةٗ مِّنَّا وَمَتَٰعًا إِلَىٰ حِينٖ (44) وَإِذَا قِيلَ لَهُمُ ٱتَّقُواْ مَا بَيۡنَ أَيۡدِيكُمۡ وَمَا خَلۡفَكُمۡ لَعَلَّكُمۡ تُرۡحَمُونَ (45) وَمَا تَأۡتِيهِم مِّنۡ ءَايَةٖ مِّنۡ ءَايَٰتِ رَبِّهِمۡ إِلَّا كَانُواْ عَنۡهَا مُعۡرِضِينَ (46) وَإِذَا قِيلَ لَهُمۡ أَنفِقُواْ مِمَّا رَزَقَكُمُ ٱللَّهُ قَالَ ٱلَّذِينَ كَفَرُواْ لِلَّذِينَ ءَامَنُوٓاْ أَنُطۡعِمُ مَن لَّوۡ يَشَآءُ ٱللَّهُ أَطۡعَمَهُۥٓ إِنۡ أَنتُمۡ إِلَّا فِي ضَلَٰلٖ مُّبِينٖ (47) وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلۡوَعۡدُ إِن كُنتُمۡ صَٰدِقِينَ (48) مَا يَنظُرُونَ إِلَّا صَيۡحَةٗ وَٰحِدَةٗ تَأۡخُذُهُمۡ وَهُمۡ يَخِصِّمُونَ (49) فَلَا يَسۡتَطِيعُونَ تَوۡصِيَةٗ وَلَآ إِلَىٰٓ أَهۡلِهِمۡ يَرۡجِعُونَ (50) وَنُفِخَ فِي ٱلصُّورِ فَإِذَا هُم mِّنَ ٱلۡأَجۡدَاثِ إِلَىٰ رَبِّهِمۡ يَنسِلُونَ (51) قَالُواْ يَٰوَيۡلَنَا مَنۢ بَعَثَنَا مِن مَّرۡقَدِنَاۜۗ هَٰذَا مَا وَعَدَ ٱلرَّحۡمَٰنُ وَصَدَقَ ٱلۡمُرۡسَلُونَ (52) إِن كَانَتۡ إِلَّا صَيۡحَةٗ وَٰحِدَةٗ فَإِذَا هُمۡ جَمِيعٞ لَّدَيۡنَا مُحۡضَرُونَ (53) فَٱلۡيَوۡمَ لَا تُظۡلَمُ نَفۡسٞ شَيۡـٔٗا وَلَا تُجۡزَوۡنَ إِلَّا مَا كُنتُمۡ تَعۡمَلُونَ (54) إِنَّ أَصۡحَٰبَ ٱلۡجَنَّةِ ٱلۡيَوۡمَ فِي شُغُلٖ فَٰكِهُونَ (55) هُمۡ وَأَزۡوَٰجُهُمۡ فِي ظِلَٰلٍ عَلَى ٱلۡأَرَآئِكِ مُتَّكِـُٔونَ (56) لَهُمۡ فِيهَا فَٰكِهَةٞ وَلَهُم مَّا يَدَّعُونَ (57) سَلَٰمٞ قَوۡلٗا مِّن رَّبّٖ رَّحِيمٖ (58) وَٱمۡتَٰزُواْ ٱلۡيَوۡمَ أَيُّهَا ٱلۡمُجۡرِمُونَ (59) ۞أَلَمۡ أَعۡهَدۡ إِلَيۡكُمۡ يَٰبَنِيٓ ءَادَمَ أَن لَّا تَعۡبُدُواْ ٱلشَّيۡطَٰنَۖ إِنَّهُۥ لَكُمۡ عَدُوّٞ مُّبِينٞ (60) وَأَنِ ٱعۡبُدُونِيۚ هَٰذَا صِرَٰطٞ مُّسۡتَقِيمٞ (61) وَلَقَدۡ أَضَلَّ مِنكُمۡ جِبِلّٗا كَثِيرًاۖ أَفَلَمۡ تَكُونُواْ تَعۡقِلُونَ (62) هَٰذِهِۦ جَهَنَّمُ ٱلَّتِي كُنتُمۡ تُوعَدُونَ (63) ٱصۡلَوۡهَا ٱلۡيَوۡمَ بِمَا كُنتُمۡ تَكۡفُرُونَ (64) ٱلۡيَوۡمَ نَخۡتِمُ عَلَىٰٓ أَفۡوَٰهِهِمۡ وَتُكَلِّمُنَآ أَيۡدِيهِمۡ وَتَشۡهَدُ أَرۡجُلُهُم بِمَا كَانُواْ يَكۡسِبُونَ (65) وَلَوۡ نَشَآءُ لَطَمَسۡنَا عَلَىٰٓ أَعۡيُنِهِمۡ فَٱسۡتَبَقُواْ ٱلصِّرَٰطَ فَأَنَّىٰ يُبۡصِرُونَ (66) وَلَوۡ نَشَآءُ لَمَسَخۡنَٰهُمۡ عَلَىٰ مَكَانَتِهِمۡ فَمَا ٱسۡتَطَٰعُواْ مُضِيّٗا وَلَا يَرۡجِعُونَ (67) وَمَن نُّعَمِّرۡهُ نُنَكِّسۡهُ فِي ٱلۡخَلۡقِۚ أَفَلَا يَعۡقِلُونَ (68) وَمَا عَلَّمۡنَٰهُ ٱلشِّعۡرَ وَمَا يَنۢبَغِي لَهُۥٓۚ إِنۡ هُوَ إِلَّا ذِكۡرٞ وَقُرۡءَانٞ مُّبِينٞ (69) لِّيُنذِرَ مَن كَانَ حَيّٗا وَيَحِقَّ ٱلۡقَوۡلُ عَلَى ٱلۡكَٰفِرِينَ (70) أَوَلَمۡ يَرَوۡاْ أَنَّا خَلَقۡنَا لَهُم مِّمَّا عَمِلَتۡ أَيۡدِينَآ أَنۡعَٰمٗا فَهُمۡ لَهَا مَٰلِكُونَ (71) وَذَلَّلۡنَٰهَا لَهُمۡ فَمِنۡهَا رَكُوبُهُمۡ وَمِنۡهَا يَأۡكُلُونَ (72) وَلَهُمۡ فِيهَا مَنَٰفِعُ وَمَشَارِبُۚ أَفَلَا يَشۡكُرُونَ (73) وَٱتَّخَذُواْ مِن دُونِ ٱللَّهِ ءَالِهَةٗ لَّعَلَّهُمۡ يُنصَرُونَ (74) لَا يَسۡتَطِيعُونَ نَصۡرَهُمۡ وَهُمۡ لَهُمۡ جُندٞ مُّحۡضَرُونَ (75) فَلَا يَحۡزُنكَ قَوۡlُهُمۡۘ إِنَّا نَعۡلَمُ مَا يُسِرُّونَ وَمَا يُعۡلِنُونَ (76) أَوَلَمۡ يَرَ ٱلۡإِنسَٰنُ أَنَّا خَلَقۡنَٰهُ مِن نُّطۡفَةٖ فَإِذَا هُوَ خَصِيمٞ مُّبِينٞ (77) وَضَرَبَ لَنَا مَثَلٗا وَنَسِيَ خَلۡقَهُۥۖ قَالَ مَن يُحۡيِ ٱلۡعِظَٰمَ وَهِيَ رَمِيمٞ (78) قُلۡ يُحۡيِيهَا ٱلَّذِيٓ أَنشَأَهَآ أَوَّلَ مَرَّةٖۖ وَهُوَ بِكُلِّ خَلۡقٍ عَلِيمٌ (79) ٱلَّذِي جَعَلَ لَكُم مِّنَ ٱلشَّجَرِ ٱلۡأَخۡضَرِ نَارٗا فَإِذَآ أَنتُم مِّنۡهُ تُوقِدُونَ (80) أَوَلَيۡسَ ٱلَّذِي خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَ بِقَٰدِرٍ عَلَىٰٓ أَن يَخۡلُقَ مِثۡلَهُمۚ بَلَىٰ وَهُوَ ٱلۡخَلَّٰقُ ٱلۡعَلِيمُ (81) إِنَّمَآ أَمۡرُهُۥٓ إِذَآ أَرَادَ شَيۡـًٔا أَن يَقُولَ لَهُۥ كُن فَيَكُونُ (82) فَسُبۡحَٰنَ ٱلَّذِي بِيَدِهِۦ مَلَكُوتُ كُلِّ شَيۡءٖ وَإِلَيۡهِ تُرۡجَعُونَ (83), ,

            

            fatiha: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ

الرَّحْمَٰنِ الرَّحِيمِ

مَالِكِ يَوْمِ الدِّينِ

إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ

اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ

صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ`

        };

        

        this.init();

    }

    

    init() {

        this.setupEventListeners();

        this.loadSavedData();

        this.startBackgroundRotation();

        this.updateStats();

        this.checkGroupKhatma();

    }

    

    setupEventListeners() {

        // Navigation

        document.querySelectorAll('.nav-btn').forEach(btn => {

            btn.addEventListener('click', (e) => {

                this.switchPage(e.target.dataset.page);

            });

        });

        

        // Dhikr buttons

        document.querySelectorAll('.dhikr-btn').forEach(btn => {

            btn.addEventListener('click', (e) => {

                this.incrementDhikr(e.target.closest('.dhikr-card').dataset.id);

            });

        });

        

        // Dua buttons

        document.querySelectorAll('.dua-count-btn').forEach(btn => {

            btn.addEventListener('click', (e) => {

                this.incrementDua(e.target.dataset.dua);

            });

        });

        

        // Quran reading buttons

        document.querySelectorAll('.read-complete-btn').forEach(btn => {

            btn.addEventListener('click', (e) => {

                this.completeSurah(e.target.dataset.surah || 'selected');

            });

        });

        

        // Surah selector

        document.getElementById('readSurah').addEventListener('click', () => {

            this.showSelectedSurah();

        });

        

        // Audio controls

        document.getElementById('audioToggle').addEventListener('click', () => {

            this.toggleAudio();

        });

        

        // Keyboard accessibility

        document.addEventListener('keydown', (e) => {

            if (e.key === 'Enter' || e.key === ' ') {

                if (e.target.classList.contains('dhikr-btn') || 

                    e.target.classList.contains('dua-count-btn') || 

                    e.target.classList.contains('read-complete-btn')) {

                    e.preventDefault();

                    e.target.click();

                }

            }

        });

    }

    

    switchPage(pageId) {

        // Update navigation

        document.querySelectorAll('.nav-btn').forEach(btn => {

            btn.classList.remove('active');

        });

        document.querySelector(`[data-page="${pageId}"]`).classList.add('active');

        

        // Update pages

        document.querySelectorAll('.page').forEach(page => {

            page.classList.remove('active');

        });

        document.getElementById(pageId).classList.add('active');

        

        this.currentPage = pageId;

    }

    

    incrementDhikr(dhikrId) {

        const card = document.querySelector(`[data-id="${dhikrId}"]`);

        const countEl = card.querySelector('.count');

        const targetEl = card.querySelector('.target');

        

        let currentCount = parseInt(localStorage.getItem(`dhikr_${dhikrId}`) || '0');

        const target = parseInt(targetEl.textContent.replace('/', ''));

        

        currentCount++;

        if (currentCount > target) {

            currentCount = 0; // Reset after reaching target

            this.showCompletionMessage(card, 'تم إكمال العدد المطلوب! بارك الله فيك');

        }

        

        countEl.textContent = currentCount;

        localStorage.setItem(`dhikr_${dhikrId}`, currentCount.toString());

        

        // Visual feedback

        card.style.transform = 'scale(1.05)';

        card.style.boxShadow = '0 6px 30px rgba(212, 175, 55, 0.4)';

        setTimeout(() => {

            card.style.transform = '';

            card.style.boxShadow = '';

        }, 200);

        

        this.updateStats();

    }

    

    incrementDua(duaId) {

        const btn = document.querySelector(`[data-dua="${duaId}"]`);

        const countEl = btn.parentElement.querySelector('.dua-count');

        

        let currentCount = parseInt(localStorage.getItem(`dua_${duaId}`) || '0');

        currentCount++;

        

        countEl.textContent = currentCount;

        localStorage.setItem(`dua_${duaId}`, currentCount.toString());

        

        // Visual feedback

        btn.textContent = 'تم بارك الله فيك ✓';

        btn.style.background = '#27ae60';

        setTimeout(() => {

            btn.textContent = 'تم الدعاء';

            btn.style.background = '';

        }, 1500);

        

        this.updateStats();

    }

    

    completeSurah(surahId) {

        let surahCount = parseInt(localStorage.getItem('surah_count') || '0');

        surahCount++;

        localStorage.setItem('surah_count', surahCount.toString());

        

        // Update display

        document.getElementById('surahCount').textContent = surahCount;

        

        // Check for khatma completion (30 surahs = 1 khatma)

        const khatmaCount = Math.floor(surahCount / this.groupKhatmaTarget);

        const previousKhatmaCount = parseInt(localStorage.getItem('khatma_count') || '0');

        

        if (khatmaCount > previousKhatmaCount) {

            localStorage.setItem('khatma_count', khatmaCount.toString());

            document.getElementById('khatmaCount').textContent = khatmaCount;

            this.showKhatmaComplete();

        }

        

        // Visual feedback

        const btn = document.querySelector(`[data-surah="${surahId}"]`) || 

                   document.getElementById('selectedSurahComplete');

        btn.textContent = 'تم بارك الله فيك ✓';

        btn.disabled = true;

        btn.style.background = '#27ae60';

        setTimeout(() => {

            btn.textContent = 'تمت القراءة';

            btn.disabled = false;

            btn.style.background = '';

        }, 2000);

        

        this.updateStats();

        this.checkGroupKhatma();

    }

    

    showSelectedSurah() {

        const select = document.getElementById('surahSelect');

        const selectedValue = select.value;

        

        if (!selectedValue) return;

        

        const surahContainer = document.getElementById('selectedSurah');

        const titleEl = document.getElementById('selectedSurahTitle');

        const textEl = document.getElementById('selectedSurahText');

        const completeBtn = document.getElementById('selectedSurahComplete');

        

        titleEl.textContent = select.options[select.selectedIndex].text;

        textEl.textContent = this.surahTexts[selectedValue];

        completeBtn.dataset.surah = selectedValue;

        

        surahContainer.style.display = 'block';

        surahContainer.scrollIntoView({ behavior: 'smooth' });

    }

    

    showKhatmaComplete() {

        const khatmaCompleteEl = document.getElementById('khatmaComplete');

        khatmaCompleteEl.style.display = 'block';

        

        // Create celebration effect

        this.createCelebrationEffect();

        

        // Auto-hide after 8 seconds

        setTimeout(() => {

            khatmaCompleteEl.style.display = 'none';

        }, 8000);

    }

    

    createCelebrationEffect() {

        // Simple celebration animation

        const celebration = document.createElement('div');

        celebration.innerHTML = '🎉 الحمد لله تمت الختمة! 🎉';

        celebration.style.cssText = `

            position: fixed;

            top: 50%;

            left: 50%;

            transform: translate(-50%, -50%);

            background: linear-gradient(135deg, #27ae60, #2ecc71);

            color: white;

            padding: 2rem;

            border-radius: 15px;

            font-size: 1.5rem;

            font-weight: 700;

            z-index: 1000;

            box-shadow: 0 10px 30px rgba(0,0,0,0.3);

            animation: celebrationPulse 3s ease-in-out;

        `;

        

        document.body.appendChild(celebration);

        

        setTimeout(() => {

            document.body.removeChild(celebration);

        }, 3000);

    }

    

    checkGroupKhatma() {

        const totalSurahs = parseInt(localStorage.getItem('surah_count') || '0');

        const progress = (totalSurahs % this.groupKhatmaTarget) / this.groupKhatmaTarget * 100;

        

        // Update progress display if element exists

        const progressEl = document.getElementById('khatmaProgress');

        if (progressEl) {

            progressEl.style.width = `${progress}%`;

        }

    }

    

    showCompletionMessage(element, message) {

        const messageEl = document.createElement('div');

        messageEl.textContent = message;

        messageEl.style.cssText = `

            position: absolute;

            top: -40px;

            left: 50%;

            transform: translateX(-50%);

            background: #27ae60;

            color: white;

            padding: 0.5rem 1rem;

            border-radius: 8px;

            font-size: 0.9rem;

            white-space: nowrap;

            z-index: 100;

            animation: fadeInOut 2s ease-in-out;

        `;

        

        element.style.position = 'relative';

        element.appendChild(messageEl);

        

        setTimeout(() => {

            element.removeChild(messageEl);

        }, 2000);

    }

    

    toggleAudio() {

        const audio = document.getElementById('backgroundAudio');

        const btn = document.getElementById('audioToggle');

        const icon = btn.querySelector('.audio-icon');

        const text = btn.querySelector('.audio-text');

        

        if (this.audioPlaying) {

            audio.pause();

            btn.classList.remove('playing');

            icon.textContent = '🔊';

            text.textContent = 'تشغيل الخلفية الصوتية';

            this.audioPlaying = false;

        } else {

            // Set volume to be gentle

            audio.volume = 0.3;

            audio.play().then(() => {

                btn.classList.add('playing');

                icon.textContent = '🔇';

                text.textContent = 'إيقاف الخلفية الصوتية';

                this.audioPlaying = true;

            }).catch(error => {

                console.log('Audio playback failed:', error);

                this.showAudioError();

            });

        }

    }

    

    showAudioError() {

        const errorMsg = document.createElement('div');

        errorMsg.textContent = 'لا يمكن تشغيل الصوت. تأكد من الاتصال بالإنترنت.';

        errorMsg.style.cssText = `

            position: fixed;

            top: 20px;

            left: 50%;

            transform: translateX(-50%);

            background: #e74c3c;

            color: white;

            padding: 1rem 2rem;

            border-radius: 8px;

            z-index: 1000;

            font-weight: 600;

        `;

        

        document.body.appendChild(errorMsg);

        

        setTimeout(() => {

            document.body.removeChild(errorMsg);

        }, 3000);

    }

    

    startBackgroundRotation() {

        const backgrounds = ['', 'bg-2', 'bg-3'];

        

        this.backgroundInterval = setInterval(() => {

            document.body.className = backgrounds[this.backgroundIndex];

            this.backgroundIndex = (this.backgroundIndex + 1) % backgrounds.length;

        }, 30000); // Change every 30 seconds

    }

    

    loadSavedData() {

        // Load dhikr counts

        document.querySelectorAll('.dhikr-card').forEach(card => {

            const id = card.dataset.id;

            const count = localStorage.getItem(`dhikr_${id}`) || '0';

            card.querySelector('.count').textContent = count;

        });

        

        // Load dua counts

        document.querySelectorAll('.dua-count-btn').forEach(btn => {

            const duaId = btn.dataset.dua;

            const count = localStorage.getItem(`dua_${duaId}`) || '0';

            btn.parentElement.querySelector('.dua-count').textContent = count;

        });

        

        // Load surah and khatma counts

        const surahCount = localStorage.getItem('surah_count') || '0';

        const khatmaCount = localStorage.getItem('khatma_count') || '0';

        

        document.getElementById('surahCount').textContent = surahCount;

        document.getElementById('khatmaCount').textContent = khatmaCount;

    }

    

    updateStats() {

        // Calculate total dhikr

        let totalDhikr = 0;

        document.querySelectorAll('.dhikr-card').forEach(card => {

            const count = parseInt(card.querySelector('.count').textContent || '0');

            totalDhikr += count;

        });

        

        // Calculate total duas

        let totalDuas = 0;

        document.querySelectorAll('.dua-count').forEach(countEl => {

            const count = parseInt(countEl.textContent || '0');

            totalDuas += count;

        });

        

        // Update footer stats

        document.getElementById('totalDhikr').textContent = totalDhikr;

        document.getElementById('totalDuas').textContent = totalDuas;

        document.getElementById('totalSurahs').textContent = 

            localStorage.getItem('surah_count') || '0';

    }

}



// Add CSS animations

const style = document.createElement('style');

style.textContent = `

    @keyframes celebrationPulse {

        0%, 100% { transform: translate(-50%, -50%) scale(1); }

        50% { transform: translate(-50%, -50%) scale(1.1); }

    }

    

    @keyframes fadeInOut {

        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }

        50% { opacity: 1; transform: translateX(-50%) translateY(0); }

    }

`;

document.head.appendChild(style);



// Initialize app when DOM is loaded

document.addEventListener('DOMContentLoaded', () => {

    new IslamicTasbihApp();

});



// Service Worker for offline functionality

if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {

        navigator.serviceWorker.register('/sw.js')

            .then(registration => {

                console.log('SW registered: ', registration);

            })

            .catch(registrationError => {

                console.log('SW registration failed: ', registrationError);

            });

    });

}

