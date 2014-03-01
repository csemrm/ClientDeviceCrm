//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"development";
NSString * const TI_APPLICATION_ID = @"com.saratogasystems.clientdevicecrm";
NSString * const TI_APPLICATION_PUBLISHER = @"Aptean";
NSString * const TI_APPLICATION_URL = @"http://www.aptean.com";
NSString * const TI_APPLICATION_NAME = @"SaratogaCRM";
NSString * const TI_APPLICATION_VERSION = @"6.0.5.0.4.2";
NSString * const TI_APPLICATION_DESCRIPTION = @"Saratoga CRM";
NSString * const TI_APPLICATION_COPYRIGHT = @"2013 by Aptean";
NSString * const TI_APPLICATION_GUID = @"a406e9f4-38bf-40ff-b6ed-ed1c17ee11eb";
BOOL const TI_APPLICATION_ANALYTICS = false;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
