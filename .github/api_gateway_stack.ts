import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { Code, Runtime } from '@aws-cdk/aws-lambda';

export class MyApiStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // 创建一个Lambda函数
        const helloFunction = new lambda.Function(this, 'tangrongxiangtest', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromInline('exports.handler = async (event) => { return { statusCode: 200, body: "Hello from Lambda!" }; }'),
            handler: 'index.handler',
        });

        // 创建一个REST API
        const api = new apigateway.RestApi(this, 'trx-test-api');

        // 定义一个资源和方法
        const helloResource = api.root.addResource('hello');
        const helloMethod = helloResource.addMethod('GET', new apigateway.LambdaIntegration(helloFunction));
    }
}

const app = new cdk.App();
new MyApiStack(app, 'MyApiStack');
