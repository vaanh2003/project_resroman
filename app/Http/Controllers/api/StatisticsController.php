<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Invoices;
use App\Models\Product;
use App\Models\ProductInvoices;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public $records = 0;
    public $total = 0;
    public $totalInvoi = 0;
    public $totalWeek = 0 ;
    public $totalMonth = 0;
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $start = Carbon::createFromDate($data['date'])->startOfWeek(Carbon::MONDAY);
        $end = Carbon::createFromDate($data['date'])->endOfWeek();
        $daysOfWeek = [];
        $dataInvoices = [];
        for ($i = 0; $i < 7; $i++) {
            $day = $start->copy()->addDays($i);
            if ($day->lte($end)) {
                $daysOfWeek[] = $day;
            }
        }
        foreach ($daysOfWeek as $key => $value) {
            $this->records = Invoices::whereDate('created_at', '=', date('Y-m-d', strtotime($value)))->get();
            $product = [];
            $products = [];
            
            foreach ($this->records as $productInvoices) {
                $products[] = $productInvoices->product_invoices;
            }
            if(count($this->records) > 0){
                $dataInvoices[] = [$this->records , $value];
                $this->records = 0;
                // \Log::debug("Những phần lấy được gái trị {$value}");
            }else{
                $dataInvoices[] = [0 , $value];
            }
            
        }

        // \Log::debug("Những phần lấy được gái trị " .$this->records);
        return [ 'hóa đơn tùng ngày'=>$dataInvoices] ;
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoices $invoices)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoices $invoices)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoices $invoices)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoices $invoices)
    {
        //
    }
    public function statisticsDay(){
        $now = Carbon::now();
        $products = [];
        $data = [];
    // Đặt múi giờ cho Việt Nam
        $now->setTimezone('Asia/Ho_Chi_Minh');
        $day = ProductInvoices::whereDate('created_at', '=', date('Y-m-d', strtotime($now)))->get();
        \Log::debug("data " . json_encode($day));
        $invoices = Invoices::whereDate('created_at', '=', date('Y-m-d', strtotime($now)))->get();
        foreach ($invoices as $key => $value) {
            $this->totalInvoi += $value->total;
        }

        // note Lấy ra cấc sản phẩm của invoices theo từng này mà foreach trả về -----------------------------------------------------------------------------------------------------------------------------------
        
        $category = Category::all();

        foreach ($category as $key => $value) {
            foreach ($day as $key => $product) {
                if($value->id == $product->product_product->id_category){
                    $this->total += $product->amount * $product->price;
                }
            }
            $data[] = ['category' => $value->name , 'total' => $this->total];
            $this->total = 0;
        }

        //note Nhóm các sản phẩm cùng id lại và cộng amount của chúng lại-----------------------------------------------------------------------------------------------------------------------------------
        $productAmount = [];
        foreach ($day as $key => $top) {
            $idToFind = $top->id_product;
            $amountToAdd = $top->amount;
            $key = array_search($idToFind, array_column($productAmount, 'id_product'));
        
            if ($key !== false) {
                // Nếu $idToFind đã tồn tại trong mảng $productAmount, cộng giá trị amount
                $productAmount[$key]['amount'] += $amountToAdd;
            } else {
                // Nếu không tìm thấy, thêm mục mới vào mảng $productAmount
                $productAmount[] = ['id_product' => $idToFind, 'amount' => $amountToAdd];
            }
        }

         //note Sắp sếp các thông số amount ra theo thứ tự từ nhỏ đến lơn và chỉ lấy 3 cái lớn nhất -----------------------------------------------------------------------------------------------------------------------------------
        usort($productAmount, function($a, $b) {
            return $b['amount'] <=> $a['amount']; // Sắp xếp giảm dần theo amount
        });

        //note Phần lấy ra top 3 sản phẩm bán chạy nhất -----------------------------------------------------------------------------------------------------------------------------------
        $productBig = [];
        $productsBig = array_slice($productAmount, 0, 3);
        foreach ($productsBig as $key => $productBigForeach) {
            $productBig[] = Product::find($productBigForeach['id_product']);
        }

        // \Log::debug("data " . json_encode($productBig));

        
        return ['category' => $data , 'invoices' => $this->totalInvoi, 'productAmount' => $productsBig , 'product' => $productBig];
    }
    public function statisticsWeek(){
        $now = Carbon::now();
        $now->setTimezone('Asia/Ho_Chi_Minh');
        $start = Carbon::createFromDate($now)->startOfWeek(Carbon::MONDAY);
        $end = Carbon::createFromDate($now)->endOfWeek();
        $category = Category::all();
        $daysOfWeek = [];
        $dataInvoices = [];
        $product = [];

        // Lấy ra các ngày trong tuần -----------------------------------------------------------------------------------------------------------------------------------
        for ($i = 0; $i < 7; $i++) {
            $day = $start->copy()->addDays($i);
            if ($day->lte($end)) {
                $daysOfWeek[] = $day;
            }
        }

        // note Chạy ra array các ngày trong tuần để hổ trợ truy vấn -----------------------------------------------------------------------------------------------------------------------------------
        foreach ($daysOfWeek as $key => $valueDate) {
            $this->records = Invoices::whereDate('created_at', '=', date('Y-m-d', strtotime($valueDate)))->get();
            $productIn = ProductInvoices::whereDate('created_at', '=', date('Y-m-d', strtotime($valueDate)))->get();
            $invoices = Invoices::whereDate('created_at', '=', date('Y-m-d', strtotime($valueDate)))->get();

            // note Lấy ra tổng doanh thu của hóa đơn theo từng này mà foreach trả về -----------------------------------------------------------------------------------------------------------------------------------
            foreach ($invoices as $key => $value) {
                $this->totalInvoi += $value->total;
            }

            // note Lấy ra cấc sản phẩm của invoices theo từng này mà foreach trả về -----------------------------------------------------------------------------------------------------------------------------------
            foreach ($productIn as $key => $in) {
                $p = $in -> product_product;
                $product[] = $in;
            }

            // 
            $products = [];
            
            foreach ($this->records as $productInvoices) {
                $products[] = $productInvoices->product_invoices;
            }

            // note Lấy ra các ngày có doanh thu và lưu nó vao array $dataInvoices -----------------------------------------------------------------------------------------------------------------------------------
            if(count($this->records) > 0){
               
                $dateTime = Carbon::parse($valueDate);
                $d = $dateTime->format('d');
                foreach ($this->records  as $key => $totalInvoicesWeek) {
                    $this->totalWeek += $totalInvoicesWeek->total;
                }
                $dataInvoices[] = ['total' => $this->totalWeek ,'day' => $d];
                $this->totalWeek = 0 ;
                $this->records = 0;
                // \Log::debug("Những phần lấy được gái trị {$value}");
            }else{
                $dateTime = Carbon::parse($valueDate);
                $d = $dateTime->format('d');
                $dataInvoices[] = ['total' => 0 ,'day' => $d];
            }
            
        }

        // note Lấy ra doanh thu các sản phẩm theo category-----------------------------------------------------------------------------------------------------------------------------------
        foreach ($category as $key => $value) {
            foreach ($product as $key => $in) {
                if($value->id == $in->product_product->id_category){
                    $this->total += $in->amount * $in->price;
                    // \Log::debug("total{$this->total}");
                }
            }
            $data[] = ['category' => $value->name , 'total' => $this->total];
            $this->total = 0;
        }

        //note Nhóm các sản phẩm cùng id lại và cộng amount của chúng lại-----------------------------------------------------------------------------------------------------------------------------------
        $productAmount = [];
        foreach ($product as $key => $top) {
            $idToFind = $top->id_product;
            $amountToAdd = $top->amount;
        
            $key = array_search($idToFind, array_column($productAmount, 'id_product'));
        
            if ($key !== false) {
                // Nếu $idToFind đã tồn tại trong mảng $productAmount, cộng giá trị amount
                $productAmount[$key]['amount'] += $amountToAdd;
            } else {
                // Nếu không tìm thấy, thêm mục mới vào mảng $productAmount
                $productAmount[] = ['id_product' => $idToFind, 'amount' => $amountToAdd];
            }
        }

        \Log::debug("data " . print_r($productAmount, true));

        //note Sắp sếp các thông số amount ra theo thứ tự từ nhỏ đến lơn và chỉ lấy 3 cái lớn nhất -----------------------------------------------------------------------------------------------------------------------------------
        usort($productAmount, function($a, $b) {
            return $b['amount'] <=> $a['amount']; // Sắp xếp giảm dần theo amount
        });

        //note Phần lấy ra top 3 sản phẩm bán chạy nhất -----------------------------------------------------------------------------------------------------------------------------------
        $productBig = [];
        $productsBig = array_slice($productAmount, 0, 3);
        foreach ($productsBig as $key => $productBigForeach) {
            $productBig[] = Product::find($productBigForeach['id_product']);
        }
        // \Log::debug("Những ngày lấy ra để truy vấn". implode(', ', $daysOfWeek));
        return ['category' => $data , 'invoices' => $this->totalInvoi , 'dataInvoices' => $dataInvoices , 'productAmount' => $productsBig , 'product' => $productBig];
    }
    public function statisticsMonth(){
        // $now = Carbon::createFromDate("2023-10-20T17:00:00.000000Z");
        $now = Carbon::now();
        $now->setTimezone('Asia/Ho_Chi_Minh');
        $start = $now->copy()->startOfMonth();
        $end = $now->copy()->endOfMonth();
        $dateTime = DateTime::createFromFormat('Y-m-d H:i:s', $end);
        $category = Category::all();
        $daysOfMonth = [];
        $dataInvoices = [];
        $product = [];
        
        $numberDay = $dateTime->format('d');
        for ($k = 0; $k <= $numberDay + 1; $k++) {
            $day = $start->copy()->addDays($k);
            if ($day->lte($end)) {
                $daysOfMonth[] = $day;
            }
        }

        foreach ($daysOfMonth as $key => $valueDate) {
            $this->records = Invoices::whereDate('created_at', '=', date('Y-m-d', strtotime($valueDate)))->get();
            $productIn = ProductInvoices::whereDate('created_at', '=', date('Y-m-d', strtotime($valueDate)))->get();
            $invoices = Invoices::whereDate('created_at', '=', date('Y-m-d', strtotime($valueDate)))->get();
            \Log::debug("Ngày đưa vào để thực hiện truy vấn " . json_encode($valueDate));
            \Log::debug("data " . json_encode($invoices));
            // note Lấy ra tổng doanh thu của hóa đơn theo từng này mà foreach trả về -----------------------------------------------------------------------------------------------------------------------------------
            foreach ($invoices as $key => $value) {
                $this->totalInvoi += $value->total;
            }

            // note Lấy ra cấc sản phẩm của invoices theo từng này mà foreach trả về -----------------------------------------------------------------------------------------------------------------------------------
            foreach ($productIn as $key => $in) {
                $p = $in -> product_product;
                $product[] = $in;
            }

            // 
            $products = [];
            
            foreach ($this->records as $productInvoices) {
                $products[] = $productInvoices->product_invoices;
            }

            // note Lấy ra các ngày có doanh thu và lưu nó vao array $dataInvoices -----------------------------------------------------------------------------------------------------------------------------------
            if(count($this->records) > 0){
               
                $dateTime = Carbon::parse($valueDate);
                $d = $dateTime->format('d');
                foreach ($this->records  as $key => $totalInvoicesWeek) {
                    $this->totalMonth += $totalInvoicesWeek->total;
                }
                $dataInvoices[] = ['total' => $this->totalMonth ,'day' => $d];
                $this->totalMonth = 0 ;
                $this->records = 0;
                // \Log::debug("Những phần lấy được gái trị {$value}");
            }else{
                $dateTime = Carbon::parse($valueDate);
                $d = $dateTime->format('d');
                $dataInvoices[] = ['total' => 0 ,'day' => $d];
            }
            
        }

        // note Lấy ra doanh thu các sản phẩm theo category-----------------------------------------------------------------------------------------------------------------------------------
        foreach ($category as $key => $value) {
            foreach ($product as $key => $in) {
                if($value->id == $in->product_product->id_category){
                    $this->total += $in->amount * $in->price;
                    // \Log::debug("total{$this->total}");
                }
            }
            $data[] = ['category' => $value->name , 'total' => $this->total];
            $this->total = 0;
        }

        //note Nhóm các sản phẩm cùng id lại và cộng amount của chúng lại-----------------------------------------------------------------------------------------------------------------------------------
        $productAmount = [];
        foreach ($product as $key => $top) {
            $idToFind = $top->id_product;
            $amountToAdd = $top->amount;
        
            $key = array_search($idToFind, array_column($productAmount, 'id_product'));
        
            if ($key !== false) {
                // Nếu $idToFind đã tồn tại trong mảng $productAmount, cộng giá trị amount
                $productAmount[$key]['amount'] += $amountToAdd;
            } else {
                // Nếu không tìm thấy, thêm mục mới vào mảng $productAmount
                $productAmount[] = ['id_product' => $idToFind, 'amount' => $amountToAdd];
            }
        }

        //note Sắp sếp các thông số amount ra theo thứ tự từ nhỏ đến lơn và chỉ lấy 3 cái lớn nhất -----------------------------------------------------------------------------------------------------------------------------------
        usort($productAmount, function($a, $b) {
            return $b['amount'] <=> $a['amount']; // Sắp xếp giảm dần theo amount
        });

        //note Phần lấy ra top 3 sản phẩm bán chạy nhất -----------------------------------------------------------------------------------------------------------------------------------
        $productBig = [];
        $productsBig = array_slice($productAmount, 0, 3);
        foreach ($productsBig as $key => $productBigForeach) {
            $productBig[] = Product::find($productBigForeach['id_product']);
        }
        // \Log::debug("Những ngày lấy ra để truy vấn". implode(', ', $daysOfWeek));
        return ['category' => $data , 'invoices' => $this->totalInvoi , 'dataInvoices' => $dataInvoices , 'productAmount' => $productsBig , 'product' => $productBig];

    }
    public function statisticsYear(){
        $now = Carbon::now();
        $now->setTimezone('Asia/Ho_Chi_Minh');
        $start = $now->copy()->startOfMonth();
        $end = $now->copy()->endOfMonth();
        $dateTime = DateTime::createFromFormat('Y-m-d H:i:s', $end);
        $category = Category::all();
        $productTop = [];
        $dataInvoices = [];
        $product = [];
        
        $numberYear = $dateTime->format('Y');

        $revenueByMonth = Invoices::whereYear('created_at', $numberYear)
        ->selectRaw('MONTH(created_at) as month, SUM(total) as total')
        ->groupByRaw('MONTH(created_at)')
        ->get();
        for ($i = 1; $i <= 12; $i++) {
            $found = false;
        
            foreach ($revenueByMonth as $revenue) {
                if ($revenue->month == $i) {
                    $dataInvoices[] = ['month' => $i, 'total' => $revenue->total];
                    $found = true;
                    $this->totalInvoi += $revenue->total;
                    break;
                }
            }
        
            if (!$found) {
                $dataInvoices[] = ['month' => $i, 'total' => 0];
            }
        }

        $productIn = ProductInvoices::whereYear('created_at', $numberYear)->get();
        foreach ($productIn as $key => $in) {
            $p = $in -> product_product;
            $product[] = $in;
        }
        foreach ($category as $key => $value) {
            foreach ($product as $key => $in) {
                if($value->id == $in->product_product->id_category){
                    $this->total += $in->amount * $in->price;
                    // \Log::debug("total{$this->total}");
                }
            }
            $data[] = ['category' => $value->name , 'total' => $this->total];
            $this->total = 0;
        }
        $productAmount = ProductInvoices::whereYear('created_at', $numberYear)
        ->select('id_product', DB::raw('SUM(amount) as totalAmount'))
        ->groupBy('id_product')
        ->orderByDesc('totalAmount') // Sắp xếp giảm dần theo totalAmount
        ->take(3) // Lấy ra 3 sản phẩm cao nhất
        ->get();
        foreach ($productAmount as $productsAmount) {
            // $productTop[] = $productAmount
            $p = $productsAmount->product_product;
        }
        return ['category' => $data , 'invoices' => $this->totalInvoi , 'dataInvoices' => $dataInvoices , 'productAmount' => $productAmount ];
        // $productIn = ProductInvoices::whereYear('created_at', 2023)->get();
        // $tong = 0;
        // foreach ($productIn as $productsAmount) {
        //         $productTop[] = $productsAmount;
        //         $p = $productsAmount->product_product;
        //     }
        // foreach ($productIn as $key => $value) {
        //     $tong += $value->amount * $value->product_product->price;
        // }
        // return $tong;
    }

}
