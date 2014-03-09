(function($)
{

	module('Memory Management Fixture');

	var ConsoleTest = window.ConsoleTest = window.ConsoleTest || {};

	ConsoleTest.testMemoryClass = function()
	{
		var self = this;

		self.testProp1 = "Goo";
		self.testProp2 = "Goo";

		return self;
	};

	var vmSubmission1 = null;
	var vmSubmission2 = null;
	var vmSubmission3 = null;
	var vmSubmission4 = null;
	var vmSubmission5 = null;
	var vmSubmission6 = null;
	var vmSubmission7 = null;
	var vmSubmission8 = null;
	var vmSubmission9 = null;
	var vmSubmission10 = null;
	var vmSubmission11 = null;
	var vmSubmission12 = null;
	var vmSubmission13 = null;
	var vmSubmission14 = null;
	var vmSubmission15 = null;
	var vmSubmission16 = null;
	var vmSubmission17 = null;
	var vmSubmission18 = null;
	var vmSubmission19 = null;
	var vmSubmission20 = null;
	var vmSubmission21 = null;
	var vmSubmission22 = null;
	var vmSubmission23 = null;
	var vmSubmission24 = null;
	var vmSubmission25 = null;
	var vmSubmission26 = null;
	var vmSubmission27 = null;
	var vmSubmission28 = null;
	var vmSubmission29 = null;
	var vmSubmission30 = null;
	var vmSubmission31 = null;
	var vmSubmission32 = null;
	var vmSubmission33 = null;
	var vmSubmission34 = null;
	var vmSubmission35 = null;
	var vmSubmission36 = null;
	var vmSubmission37 = null;
	var vmSubmission38 = null;
	var vmSubmission39 = null;
	var vmSubmission40 = null;
	var vmSubmission41 = null;
	var vmSubmission42 = null;
	var vmSubmission43 = null;
	var vmSubmission44 = null;
	var vmSubmission45 = null;
	var vmSubmission46 = null;
	var vmSubmission47 = null;
	var vmSubmission48 = null;
	var vmSubmission49 = null;
	var vmSubmission50 = null;
	var vmSubmission51 = null;
	var vmSubmission52 = null;
	var vmSubmission53 = null;
	var vmSubmission54 = null;
	var vmSubmission55 = null;
	var vmSubmission56 = null;
	var vmSubmission57 = null;
	var vmSubmission58 = null;
	var vmSubmission59 = null;
	var vmSubmission60 = null;
	var vmSubmission61 = null;
	var vmSubmission62 = null;
	var vmSubmission63 = null;
	var vmSubmission64 = null;
	var vmSubmission65 = null;

	//test('Create_65Submissions_Success', function()
	//{
	//	// Assign
	//	//debugger;
	//	vmSubmission1 = new ConsoleApp.vmSubmissionCA(1, 'formTestFixture1', false, false);
	//	vmSubmission2 = new ConsoleApp.vmSubmissionCA(2, 'formTestFixture2', false, false);
	//	vmSubmission3 = new ConsoleApp.vmSubmissionCA(3, 'formTestFixture3', false, false);
	//	vmSubmission4 = new ConsoleApp.vmSubmissionCA(4, 'formTestFixture4', false, false);
	//	vmSubmission5 = new ConsoleApp.vmSubmissionCA(5, 'formTestFixture5', false, false);
	//	vmSubmission6 = new ConsoleApp.vmSubmissionCA(6, 'formTestFixture6', false, false);
	//	vmSubmission7 = new ConsoleApp.vmSubmissionCA(7, 'formTestFixture7', false, false);
	//	vmSubmission8 = new ConsoleApp.vmSubmissionCA(8, 'formTestFixture8', false, false);
	//	vmSubmission9 = new ConsoleApp.vmSubmissionCA(9, 'formTestFixture9', false, false);
	//	vmSubmission10 = new ConsoleApp.vmSubmissionCA(10, 'formTestFixture10', false, false);
	//	vmSubmission11 = new ConsoleApp.vmSubmissionCA(11, 'formTestFixture11', false, false);
	//	vmSubmission12 = new ConsoleApp.vmSubmissionCA(12, 'formTestFixture12', false, false);
	//	vmSubmission13 = new ConsoleApp.vmSubmissionCA(13, 'formTestFixture13', false, false);
	//	vmSubmission14 = new ConsoleApp.vmSubmissionCA(14, 'formTestFixture14', false, false);
	//	vmSubmission15 = new ConsoleApp.vmSubmissionCA(15, 'formTestFixture15', false, false);
	//	vmSubmission16 = new ConsoleApp.vmSubmissionCA(16, 'formTestFixture16', false, false);
	//	vmSubmission17 = new ConsoleApp.vmSubmissionCA(17, 'formTestFixture17', false, false);
	//	vmSubmission18 = new ConsoleApp.vmSubmissionCA(18, 'formTestFixture18', false, false);
	//	vmSubmission19 = new ConsoleApp.vmSubmissionCA(19, 'formTestFixture19', false, false);
	//	vmSubmission20 = new ConsoleApp.vmSubmissionCA(20, 'formTestFixture20', false, false);
	//	vmSubmission21 = new ConsoleApp.vmSubmissionCA(21, 'formTestFixture21', false, false);
	//	vmSubmission22 = new ConsoleApp.vmSubmissionCA(22, 'formTestFixture22', false, false);
	//	vmSubmission23 = new ConsoleApp.vmSubmissionCA(23, 'formTestFixture23', false, false);
	//	vmSubmission24 = new ConsoleApp.vmSubmissionCA(24, 'formTestFixture24', false, false);
	//	vmSubmission25 = new ConsoleApp.vmSubmissionCA(25, 'formTestFixture25', false, false);
	//	vmSubmission26 = new ConsoleApp.vmSubmissionCA(26, 'formTestFixture26', false, false);
	//	vmSubmission27 = new ConsoleApp.vmSubmissionCA(27, 'formTestFixture27', false, false);
	//	vmSubmission28 = new ConsoleApp.vmSubmissionCA(28, 'formTestFixture28', false, false);
	//	vmSubmission29 = new ConsoleApp.vmSubmissionCA(29, 'formTestFixture29', false, false);
	//	vmSubmission30 = new ConsoleApp.vmSubmissionCA(30, 'formTestFixture30', false, false);
	//	vmSubmission31 = new ConsoleApp.vmSubmissionCA(31, 'formTestFixture31', false, false);
	//	vmSubmission32 = new ConsoleApp.vmSubmissionCA(32, 'formTestFixture32', false, false);
	//	vmSubmission33 = new ConsoleApp.vmSubmissionCA(33, 'formTestFixture33', false, false);
	//	vmSubmission34 = new ConsoleApp.vmSubmissionCA(34, 'formTestFixture34', false, false);
	//	vmSubmission35 = new ConsoleApp.vmSubmissionCA(35, 'formTestFixture35', false, false);
	//	vmSubmission36 = new ConsoleApp.vmSubmissionCA(36, 'formTestFixture36', false, false);
	//	vmSubmission37 = new ConsoleApp.vmSubmissionCA(37, 'formTestFixture37', false, false);
	//	vmSubmission38 = new ConsoleApp.vmSubmissionCA(38, 'formTestFixture38', false, false);
	//	vmSubmission39 = new ConsoleApp.vmSubmissionCA(39, 'formTestFixture39', false, false);
	//	vmSubmission40 = new ConsoleApp.vmSubmissionCA(40, 'formTestFixture40', false, false);
	//	vmSubmission41 = new ConsoleApp.vmSubmissionCA(41, 'formTestFixture41', false, false);
	//	vmSubmission42 = new ConsoleApp.vmSubmissionCA(42, 'formTestFixture42', false, false);
	//	vmSubmission43 = new ConsoleApp.vmSubmissionCA(43, 'formTestFixture43', false, false);
	//	vmSubmission44 = new ConsoleApp.vmSubmissionCA(44, 'formTestFixture44', false, false);
	//	vmSubmission45 = new ConsoleApp.vmSubmissionCA(45, 'formTestFixture45', false, false);
	//	vmSubmission46 = new ConsoleApp.vmSubmissionCA(46, 'formTestFixture46', false, false);
	//	vmSubmission47 = new ConsoleApp.vmSubmissionCA(47, 'formTestFixture47', false, false);
	//	vmSubmission48 = new ConsoleApp.vmSubmissionCA(48, 'formTestFixture48', false, false);
	//	vmSubmission49 = new ConsoleApp.vmSubmissionCA(49, 'formTestFixture49', false, false);
	//	vmSubmission50 = new ConsoleApp.vmSubmissionCA(50, 'formTestFixture50', false, false);
	//	vmSubmission51 = new ConsoleApp.vmSubmissionCA(51, 'formTestFixture51', false, false);
	//	vmSubmission52 = new ConsoleApp.vmSubmissionCA(52, 'formTestFixture52', false, false);
	//	vmSubmission53 = new ConsoleApp.vmSubmissionCA(53, 'formTestFixture53', false, false);
	//	vmSubmission54 = new ConsoleApp.vmSubmissionCA(54, 'formTestFixture54', false, false);
	//	vmSubmission55 = new ConsoleApp.vmSubmissionCA(55, 'formTestFixture55', false, false);
	//	vmSubmission56 = new ConsoleApp.vmSubmissionCA(56, 'formTestFixture56', false, false);
	//	vmSubmission57 = new ConsoleApp.vmSubmissionCA(57, 'formTestFixture57', false, false);
	//	vmSubmission58 = new ConsoleApp.vmSubmissionCA(58, 'formTestFixture58', false, false);
	//	vmSubmission59 = new ConsoleApp.vmSubmissionCA(59, 'formTestFixture59', false, false);
	//	vmSubmission60 = new ConsoleApp.vmSubmissionCA(60, 'formTestFixture60', false, false);
	//	vmSubmission61 = new ConsoleApp.vmSubmissionCA(61, 'formTestFixture61', false, false);
	//	vmSubmission62 = new ConsoleApp.vmSubmissionCA(62, 'formTestFixture62', false, false);
	//	vmSubmission63 = new ConsoleApp.vmSubmissionCA(63, 'formTestFixture63', false, false);
	//	vmSubmission64 = new ConsoleApp.vmSubmissionCA(64, 'formTestFixture64', false, false);
	//	vmSubmission65 = new ConsoleApp.vmSubmissionCA(65, 'formTestFixture65', false, false);
		
	//	// Act
	//	//console.table(vmSubmission1);

	//	// Assert
	//	//debugger;
	//	ok(vmSubmission1 !== null, "Passed!");
	//	ok(vmSubmission1 !== undefined, "Passed!");
	//	//equal(vmSubmission1, typeof "object", "Submission 1 created");

	//});
	
	//test('Null_65Submissions_Success', function()
	//{
	//	// Assign
	//	//debugger;
	//	vmSubmission1 = null;
	//	vmSubmission2 = null;
	//	vmSubmission3 = null;
	//	vmSubmission4 = null;
	//	vmSubmission5 = null;
	//	vmSubmission6 = null;
	//	vmSubmission7 = null;
	//	vmSubmission8 = null;
	//	vmSubmission9 = null;
	//	vmSubmission10 = null;
	//	vmSubmission11 = null;
	//	vmSubmission12 = null;
	//	vmSubmission13 = null;
	//	vmSubmission14 = null;
	//	vmSubmission15 = null;
	//	vmSubmission16 = null;
	//	vmSubmission17 = null;
	//	vmSubmission18 = null;
	//	vmSubmission19 = null;
	//	vmSubmission20 = null;
	//	vmSubmission21 = null;
	//	vmSubmission22 = null;
	//	vmSubmission23 = null;
	//	vmSubmission24 = null;
	//	vmSubmission25 = null;
	//	vmSubmission26 = null;
	//	vmSubmission27 = null;
	//	vmSubmission28 = null;
	//	vmSubmission29 = null;
	//	vmSubmission30 = null;
	//	vmSubmission31 = null;
	//	vmSubmission32 = null;
	//	vmSubmission33 = null;
	//	vmSubmission34 = null;
	//	vmSubmission35 = null;
	//	vmSubmission36 = null;
	//	vmSubmission37 = null;
	//	vmSubmission38 = null;
	//	vmSubmission39 = null;
	//	vmSubmission40 = null;
	//	vmSubmission41 = null;
	//	vmSubmission42 = null;
	//	vmSubmission43 = null;
	//	vmSubmission44 = null;
	//	vmSubmission45 = null;
	//	vmSubmission46 = null;
	//	vmSubmission47 = null;
	//	vmSubmission48 = null;
	//	vmSubmission49 = null;
	//	vmSubmission50 = null;
	//	vmSubmission51 = null;
	//	vmSubmission52 = null;
	//    vmSubmission53 = null;
	//	vmSubmission54 = null;
	//	vmSubmission55 = null;
	//	vmSubmission56 = null;
	//	vmSubmission57 = null;
	//	vmSubmission58 = null;
	//	vmSubmission59 = null;
	//    vmSubmission60 = null;
	//	vmSubmission61 = null;
	//	vmSubmission62 = null;
	//	vmSubmission63 = null;
	//	vmSubmission64 = null;
	//	vmSubmission65 = null;

	//	// Act
	//	//console.table(vmSubmission1);

	//	// Assert
	//	//debugger;
	//	ok(vmSubmission1 === null, "Passed!");
		
	//	//equal(vmSubmission1, typeof "object", "Submission 1 created");

	//});

	//test('Create_200_vmTestMemoryObjects_Success', function() {

	//	for (var i = 0; i < 65; i++) {
	//		window["vmSubmission" + i] = new ConsoleApp.vmTestMemoryObject();

	//		console.log(window["vmSubmission" + i]);
	//	}
		
	//	//setTimeout(function() {
			
	//		for (var i = 0; i < 65; i++)
	//		{
	//			console.log(window["vmSubmission" + i]);

	//			delete window["vmSubmission" + i].prop1;

	//			window["vmSubmission" + i] = undefined;

	//			delete window["vmSubmission" + i];
				
	//			console.log(window["vmSubmission" + i]);
				
				
	//		}
	//		console.log('!!!!');
	//		console.log(window);

	//	//}, 5000);

		

	//});
	
	test('object_GCed_true', function()
	{
		var someClass = function() {

			var self = this;
			self.testProp1 = "Goo";
			self.testProp2 = "Goo";

			return self;
		};

		function f()
		{
			var some = new someClass();
			return function() { };
		}

		window.f1_ = new f();

		window.f1_ = null;
		
		ok(window.f1_ === null, "Passed!");

		//window.f2_ = new f();


		//for (var i = 0; i < 65; i++)
		//{
		//	window["vmSubmission" + i] = f();

		//	console.log(window["vmSubmission" + i]);
		//}


		//for (var i = 0; i < 65; i++)
		//{
		//	console.log(window["vmSubmission" + i]);

		//	//delete window["vmSubmission" + i].prop1;

		//	window["vmSubmission" + i] = undefined;

		//	delete window["vmSubmission" + i];

		//	console.log(window["vmSubmission" + i]);


		//}
		//console.log('!!!!');
		//console.log(window);

		//}, 5000);


	});
	
	test('namespaced_object0_created_true', function()
	{
		window.testMemoryClass0 = new ConsoleTest.testMemoryClass();

		ok(window.testMemoryClass0 !== null, "Passed!");
	});

	test('namespaced_object0_GCed_true', function()
	{
		ok(window.testMemoryClass0 === null, "Passed!");
	});
	
	test('namespaced_object_created_true', function()
	{
		window.testMemoryClass1 = new ConsoleTest.testMemoryClass();
		window.testMemoryClass2 = ConsoleTest.testMemoryClass();
		
		ok(window.testMemoryClass1 !== null, "Passed!");
		ok(window.testMemoryClass2 !== null, "Passed!");
	});
	
	test('namespaced_object_GCed_false', function()
	{
		// Because of how javascript closures work by using window.testMemoryClass1 in this function it is kept in memory
		ok(window.testMemoryClass1 !== null, "Passed!");
		ok(window.testMemoryClass2 !== null, "Passed!");
		
		window.testMemoryClass1 = null; // I have checked and the values are now longer in the IE11 memory snap shot
		window.testMemoryClass2 = null;
	});
	
	test('namespaced_object_GCed_true', function()
	{
		ok(window.testMemoryClass1 === null, "Passed!");
		ok(window.testMemoryClass2 === null, "Passed!");
	});
	
	
	test('ConsoleTest.testMemoryClass_definition_GCed_false', function()
	{
		ok(ConsoleTest.testMemoryClass !== null, "Passed!");
	});
	
	test('VM_created_true', function()
	{
		var vm = new ConsoleApp.vmTestMemoryObject();

		ok(vm !== null, "Passed!");
	});
	
	test('VM_GCed_true', function()
	{

		ok(vm === null, "Passed!");
	});
	

}(jQuery));


